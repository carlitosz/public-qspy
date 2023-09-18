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
import { DateTime as dt } from 'luxon'

import 'dotenv/config'

import {
    ERROR_404_MSG,
    ERROR_500_MSG,
    ERROR_INVALID_QUERY_PARAMS_MSG,
    ERROR_MISSING_QUERY_PARAMS_MSG,
    MISSING_TABLE_NAME_MSG,
    handler
} from '@functions/ApiGetFunction'
import { AnalyzePayload, QUEUE_EMPTY_MSG, SUCCESS_MSG } from '@functions/AnalyzeFunction'

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

    it('Returns 500 if Dynamo fetch returns non-200', async () => {
        dynamoDbMock
            .on(GetItemCommand, {
                TableName: TEST_TABLE_NAME,
                Key: marshall({
                    Queue: TEST_QUEUE_NAME
                }),
                AttributesToGet: ['Data']
            } as GetItemCommandInput)
            .resolves({
                $metadata: {
                    httpStatusCode: 500
                }
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

        expect(result.statusCode).toBe(500)
        expect(JSON.parse(result.body).error.message).toBe(ERROR_500_MSG + ' Status code: 500')
    })

    it('Returns 404 if request is not found', async () => {
        dynamoDbMock
            .on(GetItemCommand, {
                TableName: TEST_TABLE_NAME,
                Key: marshall({
                    Queue: TEST_QUEUE_NAME
                }),
                AttributesToGet: ['Data']
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
            it("GetItemCommandInput uses today's ISO date in the request to DynamoDB", async () => {
                const requestPayload = {
                    queryStringParameters: {
                        queue: TEST_QUEUE_NAME
                    }
                } as Partial<APIGatewayProxyEvent>

                const responsePayload = {
                    data: [],
                    message: QUEUE_EMPTY_MSG
                } as AnalyzePayload

                dynamoDbMock
                    .on(GetItemCommand, {
                        TableName: TEST_TABLE_NAME,
                        Key: marshall({
                            Queue: TEST_QUEUE_NAME,
                            Date: dt.now().setZone('America/New_York').toISODate()
                        }),
                        AttributesToGet: ['Data']
                    })
                    .resolvesOnce({
                        $metadata: {
                            httpStatusCode: 200
                        },
                        Item: marshall({
                            Data: responsePayload
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
                    data: [
                        {
                            event: 'My\\Domain\\Event',
                            count: 23
                        }
                    ],
                    message: SUCCESS_MSG
                } as AnalyzePayload

                dynamoDbMock
                    .on(GetItemCommand, {
                        TableName: TEST_TABLE_NAME,
                        Key: marshall({
                            Queue: TEST_QUEUE_NAME,
                            Date: '2023-01-01'
                        }),
                        AttributesToGet: ['Data']
                    } as GetItemCommandInput)
                    .resolvesOnce({
                        $metadata: {
                            httpStatusCode: 200
                        },
                        Item: marshall({
                            Data: responsePayload
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
