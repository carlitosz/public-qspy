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
import { isValid } from 'date-fns'
import { formatInTimeZone } from 'date-fns-tz'
import enUS from 'date-fns/locale/en-US'

export const MISSING_TABLE_NAME_MSG = 'Missing environment variable: TABLE_NAME'
export const ERROR_500_MSG = 'Something exploded.'
export const ERROR_404_MSG = 'No items matched your request'
export const ERROR_MISSING_QUERY_PARAMS_MSG = 'Missing required request parameters: '
export const ERROR_INVALID_QUERY_PARAMS_MSG = 'Invalid request parameters: '

const env: { tableName?: string } = {
    tableName: process.env?.TABLE_NAME || undefined
}

const config: DynamoDBClientConfig = { region: 'us-east-1' }
const dynamodbClient = new DynamoDBClient(config)

const respondWith = (statusCode: number, body: string): APIGatewayProxyResult => {
    return {
        statusCode,
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': "'X-Api-Key'"
        },
        body
    }
}

export const handler: Handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    if (env?.tableName === undefined && process.env.TABLE_NAME === undefined) {
        throw new Error(MISSING_TABLE_NAME_MSG)
    }

    if (!event.queryStringParameters) {
        return respondWith(
            500,
            JSON.stringify({
                error: {
                    message: ERROR_500_MSG
                }
            })
        )
    }

    const { queue, date }: APIGatewayProxyEventQueryStringParameters = event.queryStringParameters

    if (!queue) {
        return respondWith(
            400,
            JSON.stringify({
                error: {
                    message: ERROR_MISSING_QUERY_PARAMS_MSG + '[queue]'
                }
            })
        )
    }

    if (date && !isValid(new Date(date.trim()))) {
        return respondWith(
            400,
            JSON.stringify({
                error: {
                    message: ERROR_INVALID_QUERY_PARAMS_MSG + '[date]'
                }
            })
        )
    }

    const input: GetItemCommandInput = {
        TableName: env.tableName || process.env.TABLE_NAME,
        Key: marshall({
            Queue: queue,
            Date: date
                ? formatInTimeZone(date.trim(), 'America/New_York', 'yyyy-MM-dd', { locale: enUS })
                : formatInTimeZone(new Date(), 'America/New_York', 'yyyy-MM-dd', { locale: enUS })
        }),
        AttributesToGet: ['Data']
    }

    try {
        const response: GetItemCommandOutput = await dynamodbClient.send(new GetItemCommand(input))

        if (response.$metadata.httpStatusCode !== 200) {
            return respondWith(
                500,
                JSON.stringify({
                    error: {
                        message: ERROR_500_MSG + ' Status code: ' + response.$metadata.httpStatusCode
                    }
                })
            )
        }

        if (!response?.Item) {
            return respondWith(404, JSON.stringify({ error: { message: ERROR_404_MSG } }))
        }

        return respondWith(200, JSON.stringify(unmarshall(response.Item).Data))
    } catch (e: unknown) {
        return respondWith(500, JSON.stringify({ error: { message: ERROR_500_MSG } }))
    }
}
