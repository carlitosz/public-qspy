import type { Context as AWSContext } from 'aws-lambda'

import 'aws-sdk-client-mock-jest'
import { AwsClientStub, mockClient } from 'aws-sdk-client-mock'
import {
    GetQueueAttributesCommand,
    Message,
    ReceiveMessageCommand,
    SQSClient
} from '@aws-sdk/client-sqs'

import type {
    AnalyzePayload,
    DomainEvent,
    LambdaEvent,
    QueueAttributesType
} from '@functions/AnalyzeFunction'

import {
    FUNCTION_TIMEOUT_MSG,
    getEventsFromMessages,
    getNumberOfMessagesInQueue,
    handler,
    MISSING_QUEUE_URL_MSG,
    QUEUE_EMPTY_MSG,
    QUEUE_NAME_MISMATCH_MSG,
    receiveMessages,
    remainingTime,
    SUCCESS_MSG,
    VISIBILITY_TIMEOUT_EXPIRED_MSG
} from '@functions/AnalyzeFunction'
import { createMessages, createMessage } from '@testHelpers/CreateMessages'

const sqsMock: AwsClientStub<SQSClient> = mockClient(SQSClient)
const TEST_QUEUE_URL =
    'https://sqs.us-east-1.amazonaws.com/1234567890/domain-events-test-deadletter'
const TEST_QUEUE_NAME = 'domain-events-test-deadletter'

beforeEach(() => {
    sqsMock.reset()
})

describe('AnalyzeFunction::handler', () => {
    it('Throws an error if queueUrl is not supplied', async () => {
        expect(() =>
            handler(
                {} as LambdaEvent,
                { getRemainingTimeInMillis: () => 3000 } as AWSContext,
                () => {}
            )
        ).rejects.toThrow(Error('Missing required parameter: [queueUrl]'))
    })

    it('Throws an error if queueUrl is blank or empty', async () => {
        expect(() =>
            handler(
                { queueUrl: ' ' } as LambdaEvent,
                { getRemainingTimeInMillis: () => 3000 } as AWSContext,
                () => {}
            )
        ).rejects.toThrow(Error(MISSING_QUEUE_URL_MSG))
    })

    it('Throws an error if the queue name is not the required queue name format', async () => {
        expect(() =>
            handler(
                { queueUrl: 'queue-url-bad-format' } as LambdaEvent,
                { getRemainingTimeInMillis: () => 3000 } as AWSContext,
                () => {}
            )
        ).rejects.toThrow(Error(QUEUE_NAME_MISMATCH_MSG))
    })

    it('Successfully returns when a queue is empty', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolves({
            Attributes: {
                ApproximateNumberOfMessages: '0',
                VisibilityTimeout: '30'
            },
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { data, message, queue }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            { getRemainingTimeInMillis: () => 3000 } as AWSContext,
            () => {}
        )

        expect(data).toHaveLength(0)
        expect(message).toBe(QUEUE_EMPTY_MSG)
        expect(queue).toBe(TEST_QUEUE_NAME)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
    })

    it('Returns if the visibility timeout is expired before the queue finished processing', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolvesOnce({
            Attributes: {
                ApproximateNumberOfMessages: '10',
                VisibilityTimeout: '10'
            },
            $metadata: {
                httpStatusCode: 200
            }
        })

        sqsMock.on(ReceiveMessageCommand).resolvesOnce({
            Messages: createMessages(10),
            $metadata: {
                httpStatusCode: 200
            }
        })

        // Set remaining time to -1, we will mock this value in the next line
        const awsContext = { getRemainingTimeInMillis: () => -1 } as AWSContext

        /**
         * NOTE: If the function has not finished processing the queue after
         * the queue's visibility timeout has expired, all messages that are
         * counted up to that point will be put back into the queue.
         *
         * In that case, the function should exit and return a message
         * explaining the early exit.
         */
        const timeMock = jest.spyOn(awsContext, 'getRemainingTimeInMillis')

        // 11 seconds will pass on a queue whose visibility timeout is 10 seconds.
        timeMock.mockReturnValueOnce(13000).mockReturnValueOnce(2000)

        const { data, message, queue }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            awsContext,
            () => {}
        )

        expect(message).toBe(VISIBILITY_TIMEOUT_EXPIRED_MSG)
        expect(data.length).toBeGreaterThan(0)
        expect(queue).toBe(TEST_QUEUE_NAME)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
        data.forEach((d: DomainEvent) => {
            expect(d).toHaveProperty('count')
            expect(d).toHaveProperty('event')
        })
    })

    it('Returns if the function timeout is about to be reached', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolvesOnce({
            Attributes: {
                ApproximateNumberOfMessages: '10',
                VisibilityTimeout: '300'
            },
            $metadata: {
                httpStatusCode: 200
            }
        })

        sqsMock.on(ReceiveMessageCommand).resolvesOnce({
            Messages: createMessages(10),
            $metadata: {
                httpStatusCode: 200
            }
        })

        const awsContext = { getRemainingTimeInMillis: () => {} } as AWSContext
        const timeMock = jest.spyOn(awsContext, 'getRemainingTimeInMillis')

        /**
         * NOTE: In production, the function avoids timing out by returning
         * when there are 3 seconds remaining before the function timeout
         * is reached.
         *
         * In this test, getTimeRemainingInMillis will be called twice.
         * Once on initialization (fnTimeout) and again in the loop to
         * check if function timeout is in < 3 seconds.
         */
        timeMock.mockReturnValueOnce(8000).mockReturnValueOnce(2000)

        const { data, message, queue, total }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            awsContext,
            () => {}
        )

        expect(message).toBe(FUNCTION_TIMEOUT_MSG)
        expect(data.length).toBeGreaterThan(0)
        expect(total).toBeGreaterThan(0)
        expect(queue).toBe(TEST_QUEUE_NAME)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
        data.forEach((d: DomainEvent) => {
            expect(d).toHaveProperty('count')
            expect(d).toHaveProperty('event')
        })
    })

    it('Successfully processes a queue containing 1 batch', async () => {
        sqsMock
            .on(GetQueueAttributesCommand)
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '10',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '0',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })

        sqsMock.on(ReceiveMessageCommand).resolvesOnce({
            Messages: createMessages(10),
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { data, message, queue, total }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            { getRemainingTimeInMillis: () => 3000 } as AWSContext,
            () => {}
        )

        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 2)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
        expect(data.length).toBeGreaterThan(0)
        expect(total).toBeGreaterThan(0)
        expect(message).toEqual(SUCCESS_MSG)
        expect(queue).toEqual(TEST_QUEUE_NAME)
        data.forEach((d: DomainEvent) => {
            expect(d).toHaveProperty('count')
            expect(d).toHaveProperty('event')
        })
    })

    it('Successfully processes a queue containing more than 1 batch', async () => {
        sqsMock
            .on(GetQueueAttributesCommand)
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '20',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '0',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })

        sqsMock
            .on(ReceiveMessageCommand)
            .resolvesOnce({
                Messages: createMessages(10),
                $metadata: {
                    httpStatusCode: 200
                }
            })
            .resolvesOnce({
                Messages: createMessages(10),
                $metadata: {
                    httpStatusCode: 200
                }
            })

        const { data, message, queue, total }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            { getRemainingTimeInMillis: () => 3000 } as AWSContext,
            () => {}
        )

        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 2)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 2)
        expect(data.length).toBeGreaterThan(0)
        expect(total).toBeGreaterThan(0)
        expect(message).toEqual(SUCCESS_MSG)
        expect(queue).toEqual(TEST_QUEUE_NAME)
        data.forEach((d: DomainEvent) => {
            expect(d).toHaveProperty('count')
            expect(d).toHaveProperty('event')
        })
    })

    it('Sets firstSeen and lastSeen dates for each captured event', async () => {
        sqsMock
            .on(GetQueueAttributesCommand)
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '5',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '0',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })

        sqsMock.on(ReceiveMessageCommand).resolvesOnce({
            Messages: [
                // firstSeen: Oct 19th, lastSeen: Oct 31st
                createMessage('Event', '2023-10-19 20:00:00'),
                createMessage('Event', '2023-10-30 20:00:00'),
                createMessage('Event', '2023-10-28 20:00:00'),
                createMessage('Event', '2023-10-27 20:00:00'),
                createMessage('Event', '2023-10-31 20:00:00')
            ],
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { data, message, queue, total }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            { getRemainingTimeInMillis: () => 3000 } as AWSContext,
            () => {}
        )

        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 2)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
        expect(data.length).toEqual(1)
        expect(data[0]?.fs).toEqual('2023-10-19 20:00:00')
        expect(data[0]?.ls).toEqual('2023-10-31 20:00:00')
        expect(total).toEqual(5)
        expect(message).toEqual(SUCCESS_MSG)
        expect(queue).toEqual(TEST_QUEUE_NAME)
    })

    it('Returns sorted data in descending order (e.g. 9 -> 1) by count', async () => {
        sqsMock
            .on(GetQueueAttributesCommand)
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '5',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })
            .resolvesOnce({
                Attributes: {
                    ApproximateNumberOfMessages: '0',
                    VisibilityTimeout: '300'
                },
                $metadata: {
                    httpStatusCode: 200
                }
            })

        sqsMock.on(ReceiveMessageCommand).resolvesOnce({
            Messages: [
                createMessage('Event1'),
                createMessage('Event1'),
                createMessage('Event1'),
                createMessage('Event2'),
                createMessage('Event2')
            ],
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { data }: AnalyzePayload = await handler(
            { queueUrl: TEST_QUEUE_URL } as LambdaEvent,
            { getRemainingTimeInMillis: () => 3000 } as AWSContext,
            () => {}
        )

        expect(data.length).toEqual(2)

        const lastEvent: DomainEvent | undefined = data.pop()
        expect(lastEvent?.event).toEqual('Event2')
        expect(lastEvent?.count).toEqual(2)

        const firstEvent: DomainEvent | undefined = data.pop()
        expect(firstEvent?.event).toEqual('Event1')
        expect(firstEvent?.count).toEqual(3)
    })
})

describe('AnalyzeFunction::remainingTime', () => {
    it('Converts milliseconds to seconds', () => {
        const response = remainingTime({ getRemainingTimeInMillis: () => 2000 } as AWSContext)

        expect(response).toBe(2)
    })
})

describe('AnalyzeFunction::getNumberOfMessagesInQueue', () => {
    it('Returns zero values if $metadata.httpStatusCode is not 200', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolves({
            Attributes: {},
            $metadata: {
                httpStatusCode: 400
            }
        })

        const { numberOfMessages, visibilityTimeout }: QueueAttributesType =
            await getNumberOfMessagesInQueue(TEST_QUEUE_URL)

        expect(numberOfMessages).toBe(0)
        expect(visibilityTimeout).toBe(0)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
    })

    it('Returns zero values if Attributes is undefined', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolves({
            Attributes: undefined,
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { numberOfMessages, visibilityTimeout }: QueueAttributesType =
            await getNumberOfMessagesInQueue(TEST_QUEUE_URL)

        expect(numberOfMessages).toBe(0)
        expect(visibilityTimeout).toBe(0)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
    })

    it('Returns numberOfMessages and visibilityTimeout on success', async () => {
        sqsMock.on(GetQueueAttributesCommand).resolves({
            Attributes: {
                ApproximateNumberOfMessages: '1',
                VisibilityTimeout: '30'
            },
            $metadata: {
                httpStatusCode: 200
            }
        })

        const { numberOfMessages, visibilityTimeout }: QueueAttributesType =
            await getNumberOfMessagesInQueue(TEST_QUEUE_URL)

        expect(typeof numberOfMessages).toBe('number')
        expect(typeof visibilityTimeout).toBe('number')
        expect(numberOfMessages).toBe(1)
        expect(visibilityTimeout).toBe(30)
        expect(sqsMock).toHaveReceivedCommandTimes(GetQueueAttributesCommand, 1)
    })
})

describe('AnalyzeFunction::receiveMessages', () => {
    it('Returns undefined if $metadata.httpStatusCode is not 200', async () => {
        sqsMock.on(ReceiveMessageCommand).resolves({
            Messages: [],
            $metadata: {
                httpStatusCode: 400
            }
        })

        const response: Message[] | undefined = await receiveMessages(TEST_QUEUE_URL)

        expect(response).toBeUndefined()
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
    })

    it('Returns undefined if Messages is undefined', async () => {
        sqsMock.on(ReceiveMessageCommand).resolves({
            Messages: undefined,
            $metadata: {
                httpStatusCode: 200
            }
        })

        const response: Message[] | undefined = await receiveMessages(TEST_QUEUE_URL)

        expect(response).toBeUndefined()
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
    })

    it('Returns an array of Messages on success', async () => {
        sqsMock.on(ReceiveMessageCommand).resolves({
            Messages: [
                {
                    MessageId: '1',
                    Body: 'Test 1'
                },
                {
                    MessageId: '2',
                    Body: 'Test 2'
                }
            ],
            $metadata: {
                httpStatusCode: 200
            }
        })

        const response: Message[] | undefined = await receiveMessages(TEST_QUEUE_URL)

        expect(response).not.toBeUndefined()
        expect(response).toHaveLength(2)
        expect(sqsMock).toHaveReceivedCommandTimes(ReceiveMessageCommand, 1)
    })
})

describe('AnalyzeFuntion::getEventsFromMessages', () => {
    it('Returns an array of event name and occurredOn', () => {
        const messages: Message[] = [
            {
                MessageId: '1',
                Body: JSON.stringify({
                    Message: JSON.stringify({
                        name: 'cool-event',
                        occurredOn: '2023-10-30 20:53:50'
                    })
                })
            },
            {
                MessageId: '2',
                Body: JSON.stringify({
                    Message: JSON.stringify({
                        name: 'cool-event',
                        occurredOn: '2023-10-30 20:53:51'
                    })
                })
            }
        ]

        const result: { name: string; occurredOn: string }[] = getEventsFromMessages(messages)

        expect(result).toHaveLength(2)
        expect(result).toEqual([
            { name: 'cool-event', occurredOn: '2023-10-30 20:53:50' },
            { name: 'cool-event', occurredOn: '2023-10-30 20:53:51' }
        ])
    })
})
