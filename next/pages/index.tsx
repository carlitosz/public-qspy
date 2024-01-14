import React from 'react'
import { format } from 'date-fns'
import { subDays } from 'date-fns'

import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import TableContainer from '@/components/Table/TableContainer'
import Page from '@/components/Layout/Page'
import { useRequest } from '@/utils/application/axios'

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

    if (today.error || yesterday.error) {
        return <>An error has occurred.</>
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
