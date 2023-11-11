import React from 'react'
import { format } from 'date-fns'
import { subDays } from 'date-fns'

import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import BarChartContainer from '@/components/Chart/Bar/BarChartContainer'
import { useRequest } from '@/util/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

const Home: NextPage = () => {
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
        <div className="lg:container mx-auto">
            <div className="my-6 h-12">
                <p className="text-primary text-sm antialiased">Overview</p>
                <p className="text-dark text-lg font-semibold antialised">{QUEUE_NAME}</p>
            </div>
            <div className="w-full rounded-md h-40 mb-6">
                <AnalyticsContainer data={{ today, yesterday }} />
            </div>
            <div className="w-full rounded-md h-4/6">
                <BarChartContainer data={{ today, yesterday }} title={QUEUE_NAME} withToolbar={true} />
            </div>
        </div>
    )
}

export default Home
