import {
    SQSClient,
    SQSClientConfig,
    GetQueueAttributesCommand,
    GetQueueAttributesCommandOutput,
    Message,
    ReceiveMessageCommand,
    ReceiveMessageCommandOutput
} from '@aws-sdk/client-sqs'
import { millisecondsToSeconds } from 'date-fns'

import type { Context, Handler } from 'aws-lambda'

export const BATCH_SIZE = 10
export const TIME_UNTIL_TIMEOUT = 3
export const QUEUE_NAME_FORMAT = /domain-events-.*-deadletter/gi
export const MISSING_QUEUE_URL_MSG = 'Missing required parameter: [queueUrl]'
export const QUEUE_EMPTY_MSG = 'The queue is empty'
export const QUEUE_NAME_MISMATCH_MSG = 'The queue name does not have the required format (domain-events-.*-deadletter)'
export const SUCCESS_MSG = 'The queue was sucessfully processed'
export const VISIBILITY_TIMEOUT_EXPIRED_MSG = "The queue's visibility timeout expired before the function could finish"
export const FUNCTION_TIMEOUT_MSG = 'The function reached timeout and could not complete processing the queue.'

const config: SQSClientConfig = { region: 'us-east-1' }
const sqsClient: SQSClient = new SQSClient(config)

export declare type QueueAttributesType = { numberOfMessages: number; visibilityTimeout: number }
export declare type LambdaEvent = { queueUrl: string }

export declare type DomainEvent = {
    event: string
    count: number
}

export declare type AnalyzePayload = {
    data: [DomainEvent] | []
    message: string
    queue: string
}

/**
 * Gets ApproximateNumberOfMessages from queue.
 */
export const getNumberOfMessagesInQueue = async (queueUrl: string): Promise<QueueAttributesType> => {
    const { $metadata, Attributes }: GetQueueAttributesCommandOutput = await sqsClient.send(
        new GetQueueAttributesCommand({
            QueueUrl: queueUrl,
            AttributeNames: ['ApproximateNumberOfMessages', 'VisibilityTimeout']
        })
    )

    if ($metadata.httpStatusCode !== 200) {
        return {
            numberOfMessages: 0,
            visibilityTimeout: 0
        }
    }

    if ((Attributes && !Attributes?.ApproximateNumberOfMessages) || !Attributes?.VisibilityTimeout) {
        return {
            numberOfMessages: 0,
            visibilityTimeout: 0
        }
    }

    return {
        numberOfMessages: parseInt(Attributes?.ApproximateNumberOfMessages as string),
        visibilityTimeout: parseInt(Attributes?.VisibilityTimeout as string)
    }
}

/**
 * Receive messages from the queue.
 */
export const receiveMessages = async (queueUrl: string): Promise<Message[] | undefined> => {
    const { $metadata, Messages }: ReceiveMessageCommandOutput = await sqsClient.send(
        new ReceiveMessageCommand({
            MaxNumberOfMessages: BATCH_SIZE,
            QueueUrl: queueUrl,
            MessageAttributeNames: ['All']
        })
    )

    if ($metadata.httpStatusCode !== 200) {
        return undefined
    }

    if (!Messages) {
        return undefined
    }

    return Messages
}

/**
 * Returns an array of event types.
 */
export const getEventsFromMessages = (messages: Message[]): string[] => {
    return messages
        .filter((m: Message) => m !== undefined)
        .map(({ Body }: Message): string => {
            const parsedBody = JSON.parse(Body as string)
            const { name }: { name: string } = JSON.parse(parsedBody.Message)

            return name
        })
}

/**
 * Gets the Lambda function's remaining execution time (in seconds) until timeout.
 */
export const remainingTime = (context: Context): number => millisecondsToSeconds(context.getRemainingTimeInMillis())

export const handler: Handler = async (event: LambdaEvent, context: Context): Promise<AnalyzePayload> => {
    const fnTimeout: number = remainingTime(context)
    const { queueUrl } = event

    if (queueUrl === undefined || queueUrl.trim() === '') {
        throw new Error(MISSING_QUEUE_URL_MSG)
    }

    // Parse queue name from queue URL
    const matches: RegExpMatchArray | null = queueUrl.match(QUEUE_NAME_FORMAT)

    if (matches === null) {
        throw Error(QUEUE_NAME_MISMATCH_MSG)
    }

    // The queue name
    const queue = matches[0]

    // Get initial numbers in queue
    const response: QueueAttributesType = await getNumberOfMessagesInQueue(queueUrl)
    let { numberOfMessages } = response
    const { visibilityTimeout } = response

    if (numberOfMessages === 0) {
        return {
            data: [],
            message: QUEUE_EMPTY_MSG,
            queue
        }
    }

    const collection = new Map<string, number>()

    do {
        const batches: number = Math.floor(numberOfMessages / BATCH_SIZE)

        for (let i = 0; i < batches; i++) {
            const messages: Message[] | undefined = await receiveMessages(queueUrl)

            if (messages) {
                const events: string[] = getEventsFromMessages(messages)

                for (const event of events) {
                    const existing: number | undefined = collection.get(event)
                    existing ? collection.set(event, existing + 1) : collection.set(event, 1)
                }
            }

            const timeRemaining: number = remainingTime(context)
            const elapsedTime = fnTimeout - timeRemaining

            // The function should only process messages up to the queue visibility timeout.
            if (elapsedTime > visibilityTimeout) {
                const data = Array.from(collection).map(([event, count]) => ({ event, count }))

                return {
                    data: data as [DomainEvent],
                    message: VISIBILITY_TIMEOUT_EXPIRED_MSG,
                    queue
                }
            }

            // Are we running out of time? Do not let the function timeout.
            if (timeRemaining < TIME_UNTIL_TIMEOUT) {
                const data = Array.from(collection).map(([event, count]) => ({ event, count }))

                return {
                    data: data as [DomainEvent],
                    message: FUNCTION_TIMEOUT_MSG,
                    queue
                }
            }
        }

        // Any remaining messages in the queue?
        const res: QueueAttributesType = await getNumberOfMessagesInQueue(queueUrl)
        numberOfMessages = res.numberOfMessages
    } while (numberOfMessages > 0)

    const data = Array.from(collection).map(([event, count]) => ({ event, count }))

    return {
        data: data as [DomainEvent],
        message: SUCCESS_MSG,
        queue
    }
}
