import 'aws-sdk-client-mock-jest'
import { AwsClientStub, mockClient } from 'aws-sdk-client-mock'
import { DynamoDBClient, PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { Context } from 'aws-lambda'
import { marshall } from '@aws-sdk/util-dynamodb'
import { addMonths, getUnixTime } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import enUS from 'date-fns/locale/en-US'

import 'dotenv/config'

import { AnalyzePayload, LambdaEvent, SUCCESS_MSG } from '@functions/AnalyzeFunction'
import {
    BAD_PAYLOAD_MSG,
    FAILED_TO_STORE_PAYLOAD_MSG,
    handler,
    MISSING_TABLE_NAME_MSG
} from '@functions/StoreFunction'

const dynamoDbMock: AwsClientStub<DynamoDBClient> = mockClient(DynamoDBClient)
const TEST_TABLE_NAME = 'QSpy-Events-test'
const TEST_QUEUE_NAME = 'domain-events-test-deadletter'

beforeEach(() => {
    dynamoDbMock.reset()
    console.info = jest.fn()
    process.env.TABLE_NAME = TEST_TABLE_NAME
})

describe('StoreFunction::handler', () => {
    it('Throws an error if TABLE_NAME is not supplied', async () => {
        delete process.env.TABLE_NAME

        expect(() => handler({} as LambdaEvent, {} as Context, () => {})).rejects.toThrow(
            Error(MISSING_TABLE_NAME_MSG)
        )
    })

    it('Throws an error if the payload status code is non-200', async () => {
        expect(() =>
            handler(
                {
                    responseContext: {
                        statusCode: 400
                    },
                    responsePayload: {}
                } as Partial<LambdaEvent>,
                {} as Context,
                () => {}
            )
        ).rejects.toThrow(Error(BAD_PAYLOAD_MSG + '400'))
    })

    it('Throws an error if Dynamo fails to store payload', async () => {
        const payload = {
            data: [
                {
                    event: 'My\\Domain\\Event\\Test',
                    count: 23,
                    fs: '2023-10-30 20:56:06',
                    ls: '2023-10-30 20:56:06'
                }
            ],
            message: SUCCESS_MSG,
            queue: TEST_QUEUE_NAME,
            total: 1
        } as AnalyzePayload

        dynamoDbMock
            .on(PutItemCommand, {
                TableName: TEST_TABLE_NAME,
                Item: marshall({
                    Queue: TEST_QUEUE_NAME,
                    Date: formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd', {
                        locale: enUS
                    }),
                    Data: payload.data,
                    Message: payload.message,
                    Expires: getUnixTime(addMonths(new Date(), 6)),
                    Total: payload.total
                })
            })
            .resolvesOnce({
                $metadata: {
                    httpStatusCode: 400
                }
            })

        expect(() =>
            handler(
                {
                    responseContext: {
                        statusCode: 200
                    },
                    responsePayload: payload
                },
                {} as Context,
                () => {}
            )
        ).rejects.toThrow(Error(FAILED_TO_STORE_PAYLOAD_MSG + '400'))
        expect(dynamoDbMock).toHaveReceivedCommandTimes(PutItemCommand, 1)
    })

    it('Successfully stores payload in DynamoDB', async () => {
        const payload = {
            data: [
                {
                    event: 'My\\Domain\\Event\\Test',
                    count: 23,
                    fs: '2023-10-30 20:56:06',
                    ls: '2023-10-30 20:56:06'
                }
            ],
            message: SUCCESS_MSG,
            queue: TEST_QUEUE_NAME,
            total: 1
        } as AnalyzePayload

        dynamoDbMock
            .on(PutItemCommand, {
                TableName: TEST_TABLE_NAME,
                Item: marshall({
                    Queue: TEST_QUEUE_NAME,
                    Date: formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd', {
                        locale: enUS
                    }),
                    Data: payload.data,
                    Message: payload.message,
                    Expires: getUnixTime(addMonths(new Date(), 6)),
                    Total: payload.total
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
