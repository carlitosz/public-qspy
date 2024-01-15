import React from 'react'
import { format } from 'date-fns'
import { subDays } from 'date-fns'

import Alert from '@/components/Alert/Alert'
import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import Page from '@/components/Page/Page'
import TableContainer from '@/components/Table/TableContainer'
import { getErrorMessage, useRequest } from '@/utils/application/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

const Home: NextPage = (): JSX.Element => {
    const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
    const DATE_TODAY = format(new Date(), 'yyyy-MM-dd')
    const DATE_YESTERDAY = format(subDays(new Date(), 1), 'yyyy-MM-dd')

    const today: GetEventsResponse = useRequest<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent(DATE_TODAY)}`,
            method: 'GET'
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    const yesterday: GetEventsResponse = useRequest<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent(DATE_YESTERDAY)}`,
            method: 'GET'
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    if (today.error) {
        const { code, message } = getErrorMessage(today.error)

        return (
            <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
                <Alert message={`${code} ${message}`} title="An error has occurred" type="danger" />
            </Page>
        )
    }

    if (yesterday.error) {
        const { code, message } = getErrorMessage(yesterday.error.error)

        return (
            <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
                <Alert message={`${code} ${message}`} title="An error has occurred" type="danger" />
            </Page>
        )
    }

    return (
        <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
            <div className="w-full rounded-md h-auto">
                <AnalyticsContainer data={{ today, yesterday }} />
            </div>
            <div className="w-full h-fit py-8">
                <TableContainer data={{ today, yesterday }} />
            </div>
        </Page>
    )
}

export default Home
