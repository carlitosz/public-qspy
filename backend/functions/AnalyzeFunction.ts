import {
    SQSClient,
    SQSClientConfig,
    GetQueueAttributesCommand,
    GetQueueAttributesCommandOutput,
    Message,
    ReceiveMessageCommand,
    ReceiveMessageCommandOutput
} from '@aws-sdk/client-sqs'
import moment from 'moment'

import type { Context, Handler } from 'aws-lambda'

const BATCH_SIZE = 10
const config: SQSClientConfig = { region: 'us-east-1' }
const sqsClient: SQSClient = new SQSClient(config)

declare type QueueAttributesType = { numberOfMessages: number; visibilityTimeout: number }
declare type LambdaEvent = { queueUrl: string }

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
const getNumberOfMessagesInQueue = async (queueUrl: string): Promise<QueueAttributesType> => {
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
const receiveMessages = async (queueUrl: string): Promise<Message[] | undefined> => {
    const { $metadata, Messages }: ReceiveMessageCommandOutput = await sqsClient.send(
        new ReceiveMessageCommand({
            MaxNumberOfMessages: BATCH_SIZE,
            QueueUrl: queueUrl,
            MessageAttributeNames: ['All']
        })
    )

    if ($metadata.httpStatusCode !== 200) {
        throw new Error(`receiveMessages failed with status: ${$metadata.httpStatusCode}`)
    }

    if (!Messages) {
        return undefined
    }

    return Messages
}

/**
 * Returns an array of event types.
 */
const getEventsFromMessages = (messages: Message[]): string[] => {
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
const remainingTime = (context: Context): number => moment.duration(context.getRemainingTimeInMillis()).asSeconds()

export const handler: Handler = async (event: LambdaEvent, context: Context): Promise<AnalyzePayload> => {
    const fnTimeout: number = remainingTime(context)
    const { queueUrl } = event

    if (queueUrl === undefined || queueUrl.trim() === '') {
        throw new Error(`Missing required parameter: queueUrl`)
    }

    // Get initial numbers in queue
    const response: QueueAttributesType = await getNumberOfMessagesInQueue(queueUrl)
    let { numberOfMessages } = response
    const { visibilityTimeout } = response

    // Queue name
    const matches: RegExpMatchArray | null = queueUrl.match(/domain-events-.*-deadletter/gi)
    const queue = matches === null ? '' : matches[0]

    if (numberOfMessages === 0) {
        return {
            data: [],
            message: 'The queue is empty.',
            queue
        }
    }

    const collection = new Map<string, number>()
    let message = `The queue was sucessfully processed.`

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
                message = `The queue's visibility timeout (${visibilityTimeout}) expired before the function could finish processing the queue.`

                break
            }

            // Are we running out of time? Do not let the function timeout.
            if (timeRemaining < 3) {
                message = `The function reached timeout and could not complete processing the queue.`

                break
            }
        }

        // Any remaining messages in the queue?
        const res: QueueAttributesType = await getNumberOfMessagesInQueue(queueUrl)
        numberOfMessages = res.numberOfMessages
    } while (numberOfMessages > 0)

    const data = Array.from(collection).map(([event, count]) => ({ event, count }))

    return {
        data: data as [DomainEvent],
        message,
        queue
    }
}
