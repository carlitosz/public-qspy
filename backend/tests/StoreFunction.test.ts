import 'aws-sdk-client-mock-jest'
import { AwsClientStub, mockClient } from 'aws-sdk-client-mock'
import { DynamoDBClient, PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { Context } from 'aws-lambda'
import { marshall } from '@aws-sdk/util-dynamodb'
import { DateTime as dt } from 'luxon'

import 'dotenv/config'

import { AnalyzePayload, SUCCESS_MSG } from '@functions/AnalyzeFunction'
import { BAD_PAYLOAD_MSG, FAILED_TO_STORE_PAYLOAD_MSG, handler } from '@functions/StoreFunction'
import { MISSING_TABLE_NAME_MSG } from '@functions/StoreFunction'

const dynamoDbMock: AwsClientStub<DynamoDBClient> = mockClient(DynamoDBClient)
const TEST_TABLE_NAME = 'QSpy-Events-test'
const TEST_QUEUE_NAME = 'domain-events-test-deadletter'

beforeEach(() => {
    dynamoDbMock.reset()
    console.info = jest.fn()
})

describe('StoreFunction::handler', () => {
    it('Throws an error if TABLE_NAME is not supplied', async () => {
        try {
            await handler(
                {
                    responseContext: {
                        statusCode: 200
                    },
                    responsePayload: {}
                },
                {} as Context,
                () => {}
            )
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(Error)

            const e = error as Error
            expect(e.message).toBe(MISSING_TABLE_NAME_MSG)
        }
    })

    it('Terminates execution if the payload is not status 200', async () => {
        process.env.TABLE_NAME = TEST_TABLE_NAME

        try {
            await handler(
                {
                    responseContext: {
                        statusCode: 400
                    },
                    responsePayload: {}
                },
                {} as Context,
                () => {}
            )
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(Error)

            const e = error as Error
            expect(e.message).toBe(BAD_PAYLOAD_MSG + '400')
        }
    })

    it('Fails to store payload in DynamoDB with non-200 status', async () => {
        process.env.TABLE_NAME = TEST_TABLE_NAME
        const payload = {
            data: [
                {
                    event: 'My\\Domain\\Event\\Test',
                    count: 23
                }
            ],
            message: SUCCESS_MSG,
            queue: TEST_QUEUE_NAME
        } as AnalyzePayload

        dynamoDbMock
            .on(PutItemCommand, {
                TableName: TEST_TABLE_NAME,
                Item: marshall({
                    Queue: TEST_QUEUE_NAME,
                    Date: dt.now().setZone('America/New_York').toISODate(),
                    Data: { data: payload.data, message: payload.message },
                    Expires: dt.now().plus({ months: 6 }).toUnixInteger()
                })
            })
            .resolvesOnce({
                $metadata: {
                    httpStatusCode: 400
                }
            })

        try {
            await handler(
                {
                    responseContext: {
                        statusCode: 200
                    },
                    responsePayload: payload
                },
                {} as Context,
                () => {}
            )
        } catch (error: unknown) {
            expect(error).toBeInstanceOf(Error)

            const e = error as Error
            expect(e.message).toBe(FAILED_TO_STORE_PAYLOAD_MSG + '400')
        }

        expect(dynamoDbMock).toHaveReceivedCommandTimes(PutItemCommand, 1)
    })

    it('Successfully stores payload in DynamoDB', async () => {
        process.env.TABLE_NAME = TEST_TABLE_NAME
        const payload = {
            data: [
                {
                    event: 'My\\Domain\\Event\\Test',
                    count: 23
                }
            ],
            message: SUCCESS_MSG,
            queue: TEST_QUEUE_NAME
        } as AnalyzePayload

        dynamoDbMock
            .on(PutItemCommand, {
                TableName: TEST_TABLE_NAME,
                Item: marshall({
                    Queue: TEST_QUEUE_NAME,
                    Date: dt.now().setZone('America/New_York').toISODate(),
                    Data: { data: payload.data, message: payload.message },
                    Expires: dt.now().plus({ months: 6 }).toUnixInteger()
                })
            })
            .resolves({
                $metadata: {
                    httpStatusCode: 200,
                    requestId: '6L2PDPVJ24MI6QGBIO2UB927RJVV4KQNSO5AEMVJF66Q9ASUAAJG',
                    attempts: 1,
                    totalRetryDelay: 0
                }
            } as PutItemCommandOutput)

        await handler(
            {
                responseContext: {
                    statusCode: 200
                },
                responsePayload: payload
            },
            {} as Context,
            () => {}
        )

        expect(dynamoDbMock).toHaveReceivedCommandTimes(PutItemCommand, 1)
        expect(console.info).toHaveBeenCalledWith(
            'Successfully stored payload in ' + TEST_TABLE_NAME
        )
    })
})
