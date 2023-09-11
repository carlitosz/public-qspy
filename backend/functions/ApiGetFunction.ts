import {
    Handler,
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    APIGatewayProxyEventQueryStringParameters
} from 'aws-lambda'
import {
    DynamoDBClient,
    DynamoDBClientConfig,
    GetItemCommand,
    GetItemCommandInput,
    GetItemCommandOutput
} from '@aws-sdk/client-dynamodb'
import { marshall, unmarshall } from '@aws-sdk/util-dynamodb'
import { DateTime as dt } from 'luxon'

const env: { tableName?: string } = {
    tableName: process.env.TABLE_NAME
}

const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': 'GET, OPTIONS'
}

const config: DynamoDBClientConfig = { region: 'us-east-1' }
const dynamodbClient = new DynamoDBClient(config)

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (env?.tableName === undefined) {
        throw new Error(`Missing environment variable: TABLE_NAME`)
    }

    if (!event.queryStringParameters) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: {
                    message: 'Something blew up'
                }
            })
        }
    }

    const { queue, date }: APIGatewayProxyEventQueryStringParameters = event.queryStringParameters

    if (!queue) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: {
                    message: 'Missing required request parameters: [queue]'
                }
            })
        }
    }

    if (date && !dt.fromISO(date.trim()).setZone('America/New_York').isValid) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
                error: {
                    message: 'Invalid request parameters: [date]'
                }
            })
        }
    }

    const input: GetItemCommandInput = {
        TableName: env.tableName,
        Key: marshall({
            Queue: queue,
            Date: date
                ? dt.fromISO(date.trim()).setZone('America/New_York').toISODate()
                : dt.now().setZone('America/New_York').toISODate()
        }),
        AttributesToGet: ['Data']
    }

    try {
        const response: GetItemCommandOutput = await dynamodbClient.send(new GetItemCommand(input))

        if (!response.$metadata?.httpStatusCode) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({
                    error: {
                        message: 'Something broke.'
                    }
                })
            }
        }

        if (!response?.Item) {
            return {
                statusCode: 404,
                headers,
                body: JSON.stringify({
                    error: {
                        message: `No items matched your request.`
                    }
                })
            }
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(unmarshall(response.Item).Data)
        }
    } catch (e: unknown) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: {
                    message: 'Something exploded.'
                }
            })
        }
    }
}
