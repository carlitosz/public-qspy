import React from 'react'
import { format } from 'date-fns'

import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import ChartContainer from '@/components/Chart/Bar/BarChartContainer'
import PageContainer from '@/components/Layout/PageContainer'
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
        return (
            <PageContainer mainTitle="Daily Analytics">
                <></>
            </PageContainer>
        )
    }

    return (
        <PageContainer mainTitle={QUEUE_NAME}>
            <div className="flex flex-inline flex-nowrap mb-6 h-1/6">
                <AnalyticsContainer queueName={QUEUE_NAME} todaysData={data} />
            </div>
            <div className="h-2/3">
                <ChartContainer data={data} isLoading={isValidating} title={QUEUE_NAME} withToolbar={true} />
            </div>
        </PageContainer>
    )
}

export default Home
