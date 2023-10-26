import React from 'react'
import enUS from 'date-fns/locale/en-US'
import { format } from 'date-fns'

import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { request } from '@/util/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

const Home: NextPage = () => {
    const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
    const DATE = format(new Date(), 'yyyy-MM-dd')

    const { isValidating, error, data } = request<GetEventsResponse>(
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
