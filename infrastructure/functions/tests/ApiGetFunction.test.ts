import 'aws-sdk-client-mock-jest'
import { AwsClientStub, mockClient } from 'aws-sdk-client-mock'
import {
    DynamoDBClient,
    GetItemCommand,
    GetItemCommandInput,
    GetItemCommandOutput
} from '@aws-sdk/client-dynamodb'
import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda'
import { marshall } from '@aws-sdk/util-dynamodb'
import { format } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import enUS from 'date-fns/locale/en-US'

import 'dotenv/config'

import {
    ERROR_404_MSG,
    ERROR_500_MSG,
    ERROR_INVALID_QUERY_PARAMS_MSG,
    ERROR_MISSING_QUERY_PARAMS_MSG,
    MISSING_TABLE_NAME_MSG,
    handler
} from '@functions/ApiGetFunction'
import { QUEUE_EMPTY_MSG, SUCCESS_MSG } from '@functions/AnalyzeFunction'

const dynamoDbMock: AwsClientStub<DynamoDBClient> = mockClient(DynamoDBClient)
const TEST_TABLE_NAME = 'QSpy-Events-test'
const TEST_QUEUE_NAME = 'domain-events-test-deadletter'

beforeEach(() => {
    dynamoDbMock.reset()
    console.info = jest.fn()
    process.env.TABLE_NAME = TEST_TABLE_NAME
})

describe('ApiGetFunction::handler', () => {
    it('Throws an error if TABLE_NAME is not defined', async () => {
        delete process.env.TABLE_NAME

        expect(() => handler({} as APIGatewayProxyEvent, {} as Context, () => {})).rejects.toThrow(
            Error(MISSING_TABLE_NAME_MSG)
        )
    })

    it('Returns 500 if query string parameters are not in the APIGatewayProxyEvent', async () => {
        const result: APIGatewayProxyResult = await handler(
            {} as APIGatewayProxyEvent,
            {} as Context,
            () => {}
        )

        expect(result.statusCode).toBe(500)
        expect(JSON.parse(result.body).error.message).toBe(ERROR_500_MSG)
    })

    it('Returns 400 if the required query string parameters are not set', async () => {
        const result: APIGatewayProxyResult = await handler(
            {
                queryStringParameters: {}
            },
            {} as Context,
            () => {}
        )

        expect(result.statusCode).toBe(400)
        expect(JSON.parse(result.body).error.message).toBe(
            ERROR_MISSING_QUERY_PARAMS_MSG + '[queue]'
        )
    })

    it('Returns 400 if the date is invalid or malformed', async () => {
        const result: APIGatewayProxyResult = await handler(
            {
                queryStringParameters: {
                    queue: TEST_QUEUE_NAME,
                    date: '2023-99-99'
                }
            },
            {} as Context,
            () => {}
        )

        expect(result.statusCode).toBe(400)
        expect(JSON.parse(result.body).error.message).toBe(
            ERROR_INVALID_QUERY_PARAMS_MSG + '[date]'
        )
    })

    it('Returns 404 if request is not found', async () => {
        const today = formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd', {
            locale: enUS
        })

        dynamoDbMock
            .on(GetItemCommand, {
                ExpressionAttributeNames: {
                    '#Data': 'Data',
                    '#Date': 'Date',
                    '#Message': 'Message',
                    '#Total': 'Total'
                },
                Key: marshall({
                    Queue: TEST_QUEUE_NAME,
                    Date: today
                }),
                ProjectionExpression: '#Data, #Date, #Message, #Total',
                TableName: TEST_TABLE_NAME
            } as GetItemCommandInput)
            .resolves({
                $metadata: {
                    httpStatusCode: 200
                },
                Item: undefined
            } as GetItemCommandOutput)

        const result: APIGatewayProxyResult = await handler(
            {
                queryStringParameters: {
                    queue: TEST_QUEUE_NAME
                }
            },
            {} as Context,
            () => {}
        )

        expect(result.statusCode).toBe(404)
        expect(JSON.parse(result.body).error.message).toBe(ERROR_404_MSG)
    })

    describe('Successful requests', () => {
        describe('When query parameters only include [queue]', () => {
            it("GetItemCommandInput uses today's date in the request to DynamoDB", async () => {
                const requestPayload = {
                    queryStringParameters: {
                        queue: TEST_QUEUE_NAME
                    }
                } as Partial<APIGatewayProxyEvent>

                const today = formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd', {
                    locale: enUS
                })

                const responsePayload = {
                    Data: [],
                    Date: today,
                    Message: QUEUE_EMPTY_MSG,
                    Total: 0
                }

                dynamoDbMock
                    .on(GetItemCommand, {
                        ExpressionAttributeNames: {
                            '#Data': 'Data',
                            '#Date': 'Date',
                            '#Message': 'Message',
                            '#Total': 'Total'
                        },
                        TableName: TEST_TABLE_NAME,
                        Key: marshall({
                            Queue: TEST_QUEUE_NAME,
                            Date: today
                        }),
                        ProjectionExpression: '#Data, #Date, #Message, #Total'
                    })
                    .resolvesOnce({
                        $metadata: {
                            httpStatusCode: 200
                        },
                        Item: marshall({
                            Data: responsePayload.Data,
                            Date: today,
                            Message: responsePayload.Message,
                            Total: responsePayload.Data.length
                        })
                    })

                const result: APIGatewayProxyResult = await handler(
                    requestPayload,
                    {} as Context,
                    () => {}
                )

                expect(result.statusCode).toBe(200)
                expect(JSON.parse(result.body)).toMatchObject(responsePayload)
            })
        })

        describe('When query parameters include [queue] and [date]', () => {
            it('GetItemCommandInput uses the supplied date in the request do DynamoDB', async () => {
                const requestPayload = {
                    queryStringParameters: {
                        queue: TEST_QUEUE_NAME,
                        date: '2023-01-01'
                    }
                } as Partial<APIGatewayProxyEvent>

                const responsePayload = {
                    Data: [
                        {
                            event: 'My\\Domain\\Event',
                            count: 23
                        }
                    ],
                    Date: '2023-10-01',
                    Message: SUCCESS_MSG,
                    Total: 1
                }

                dynamoDbMock
                    .on(GetItemCommand, {
                        ExpressionAttributeNames: {
                            '#Data': 'Data',
                            '#Date': 'Date',
                            '#Message': 'Message',
                            '#Total': 'Total'
                        },
                        TableName: TEST_TABLE_NAME,
                        Key: marshall({
                            Queue: TEST_QUEUE_NAME,
                            Date: format(new Date('2023-01-01'), 'yyyy-MM-dd')
                        }),
                        ProjectionExpression: '#Data, #Date, #Message, #Total'
                    } as GetItemCommandInput)
                    .resolvesOnce({
                        $metadata: {
                            httpStatusCode: 200
                        },
                        Item: marshall({
                            Data: responsePayload.Data,
                            Date: responsePayload.Date,
                            Message: responsePayload.Message,
                            Total: responsePayload.Data.length
                        })
                    } as GetItemCommandOutput)

                const result: APIGatewayProxyResult = await handler(
                    requestPayload,
                    {} as Context,
                    () => {}
                )

                expect(result.statusCode).toBe(200)
                expect(JSON.parse(result.body)).toMatchObject(responsePayload)
            })
        })
    })
})
