import React from 'react'
import { format } from 'date-fns'
import { subDays } from 'date-fns'

import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import BarChartContainer from '@/components/Chart/Bar/BarChartContainer'
import Page from '@/components/Layout/Page'
import { useRequest } from '@/util/axios'

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
        return <></>
    }

    return (
        <Page title="Daily Overview" heading={QUEUE_NAME}>
            <div className="w-full rounded-md h-auto mb-6">
                <AnalyticsContainer data={{ today, yesterday }} />
            </div>
            <div className="w-full rounded-md h-3/5">
                <BarChartContainer data={{ today, yesterday }} title={QUEUE_NAME} />
            </div>
        </Page>
    )
}

export default Home
