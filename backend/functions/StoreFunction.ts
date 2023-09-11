import {
    DynamoDBClient,
    DynamoDBClientConfig,
    PutItemCommand,
    PutItemCommandInput,
    PutItemCommandOutput
} from '@aws-sdk/client-dynamodb'
import { marshall } from '@aws-sdk/util-dynamodb'
import { DateTime as dt } from 'luxon'

import type { Handler } from 'aws-lambda'
import type { AnalyzePayload, DomainEvent } from './AnalyzeFunction'

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
    if (env?.tableName === undefined) {
        throw new Error(`Missing environment variable: TABLE_NAME`)
    }

    const { responseContext, responsePayload } = event

    if (responseContext.statusCode !== 200) {
        console.error(`An error has occurred with status: ${responseContext.statusCode}`)

        return
    }

    const { data, message, queue }: { data: [DomainEvent] | []; message: string; queue: string } = responsePayload

    const input: PutItemCommandInput = {
        TableName: env.tableName,
        Item: marshall({
            Queue: queue,
            Date: dt.now().setZone('America/New_York').toISODate(),
            Data: { data, message },
            Expires: dt.now().plus({ months: 6 }).toUnixInteger()
        })
    }

    return dynamodbClient
        .send(new PutItemCommand(input))
        .then((response: PutItemCommandOutput) => {
            console.log(`Response: ${JSON.stringify(response)}`)
        })
        .catch((err) => console.error(err))
}
