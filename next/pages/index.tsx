import React from 'react'
import { format } from 'date-fns'

import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import BarChartContainer from '@/components/Chart/Bar/BarChartContainer'
import { useRequest } from '@/util/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

const Home: NextPage = () => {
    const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
    const DATE = format(new Date(), 'yyyy-MM-dd')

    const { isValidating, error, data } = useRequest<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent(DATE)}`,
            method: 'GET'
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    if (error) {
        return <></>
    }

    return (
        <div className="lg:container mx-auto">
            <div className="block py-4 h-24">
                <p className="text-primary text-sm antialiased">Overview</p>
                <p className="text-dark text-lg font-semibold antialised">{QUEUE_NAME}</p>
            </div>
            <div className="w-full rounded-md h-48">
                <AnalyticsContainer queueName={QUEUE_NAME} todaysData={data} />
            </div>
            <div className="w-full rounded-md h-4/6">
                <BarChartContainer data={data} isLoading={isValidating} title={QUEUE_NAME} withToolbar={true} />
            </div>
        </div>
    )
}

export default Home
