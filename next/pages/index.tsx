import React from 'react'

import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { request } from '@/util/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

const Home: NextPage = () => {
    const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'

    const { isValidating, error, data } = request<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent('2023-10-18')}`,
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
            <ChartContainer
                data={data}
                isLoading={isValidating}
                skeleton={<ChartSkeleton />}
                title={QUEUE_NAME}
                withToolbar={true}
            />
        </Container>
    )
}

export default Home
