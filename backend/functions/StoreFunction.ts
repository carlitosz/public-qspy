import { DynamoDBClient, DynamoDBClientConfig, PutItemCommand, PutItemCommandOutput } from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { DateTime as dt } from 'luxon'

import type { Handler } from 'aws-lambda'
import type { AnalyzePayload, DomainEvent } from './AnalyzeFunction'

export const FAILED_TO_STORE_PAYLOAD_MSG = 'Failed to store payload with status code: '
export const MISSING_TABLE_NAME_MSG = 'Missing environment variable: TABLE_NAME'
export const BAD_PAYLOAD_MSG = 'Unable to store data. Received payload with status: '

const env: { tableName?: string } = {
    tableName: process.env.TABLE_NAME
}

const config: DynamoDBClientConfig = { region: 'us-east-1' }
const dynamodbClient = new DynamoDBClient(config)

declare type LambdaEvent = {
    responseContext: {
        statusCode: number
    }
    responsePayload: AnalyzePayload
}

export const handler: Handler = async (event: LambdaEvent): Promise<void> => {
    if (env?.tableName === undefined && process.env.TABLE_NAME === undefined) {
        throw new Error(MISSING_TABLE_NAME_MSG)
    }

    const { responseContext, responsePayload } = event

    if (responseContext.statusCode !== 200) {
        throw new Error(BAD_PAYLOAD_MSG + responseContext.statusCode)
    }

    const { data, message, queue }: { data: [DomainEvent] | []; message: string; queue: string } = responsePayload

    const result: PutItemCommandOutput = await dynamodbClient.send(
        new PutItemCommand({
            TableName: env.tableName || process.env.TABLE_NAME,
            Item: marshall({
                Queue: queue,
                Date: dt.now().setZone('America/New_York').toISODate(),
                Data: { data, message },
                Expires: dt.now().plus({ months: 6 }).toUnixInteger()
            })
        })
    )

    if (result.$metadata.httpStatusCode === 200) {
        console.info('Successfully stored payload in ' + process.env.TABLE_NAME)
    } else {
        throw new Error(FAILED_TO_STORE_PAYLOAD_MSG + result.$metadata.httpStatusCode)
    }
}
