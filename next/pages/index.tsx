import React from 'react'
import { format } from 'date-fns'

import AnalyticsContainer from '@/components/Layout/Containers/AnalyticsContainer'
import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
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
        <Container mainTitle={QUEUE_NAME}>
            <div className="flex flex-inline flex-nowrap mb-6 h-1/6">
                <AnalyticsContainer queueName={QUEUE_NAME} todaysData={data} />
            </div>
            <div className="h-2/3">
                <ChartContainer data={data} isLoading={isValidating} title={QUEUE_NAME} withToolbar={true} />
            </div>
        </Container>
    )
}

export default Home
