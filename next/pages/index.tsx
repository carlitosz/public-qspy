import React from 'react'
import { format } from 'date-fns'

import AnalyticsContainer from '@/components/Layout/Containers/AnalyticsContainer'
import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
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
            <Container mainTitle="Daily Analytics">
                <></>
            </Container>
        )
    }

    return (
        <Container mainTitle="Daily Analytics">
            <div className="grid grid-cols-4 gap-2 mb-4">
                <AnalyticsContainer queueName={QUEUE_NAME} todaysData={data} />
            </div>
            <div className="grid grid-cols-2 gap-2">
                <ChartContainer
                    data={data}
                    isLoading={isValidating}
                    skeleton={<ChartSkeleton />}
                    title={QUEUE_NAME}
                    withToolbar={true}
                />
                <ChartContainer
                    data={data}
                    isLoading={isValidating}
                    skeleton={<ChartSkeleton />}
                    title={QUEUE_NAME}
                    withToolbar={true}
                />
            </div>
        </Container>
    )
}

export default Home
