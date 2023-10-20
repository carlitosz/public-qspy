import React, { useState } from 'react'

import BarChart from '@/components/ApexChart/BarChart'
import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { getErrorMessage, request } from '@/util/axios'
import { paginate, sort } from '@/util/paginate'

import type { NextPage } from 'next'
import type { DomainEvent, GetEventsResponse } from 'types'

interface HomePageProps {}

const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
const RESULTS_PER_PAGE = 70

const Home: NextPage<HomePageProps> = ({}: HomePageProps) => {
    const [horizontal, setHorizontal] = useState<boolean>(false)
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
        const message: string = getErrorMessage(error)

        return (
            <Container mainTitle="Daily Analytics">
                <ChartContainer title="">
                    <div className="flex justify-center align-center py-12 bg-neutral-100">
                        <p className="text-xl">{message}</p>
                    </div>
                </ChartContainer>
            </Container>
        )
    }

    if (!data || isValidating) {
        return (
            <Container mainTitle="Daily Analytics">
                <ChartContainer title={QUEUE_NAME}>
                    <ChartSkeleton />
                </ChartContainer>
            </Container>
        )
    }

    if (data.data.length === 0) {
        return (
            <Container mainTitle="Daily Analytics">
                <ChartContainer title="">
                    <div className="flex justify-center align-center py-12 bg-neutral-100">
                        <p className="text-xl">No results returned :\</p>
                    </div>
                </ChartContainer>
            </Container>
        )
    }

    const sorted: DomainEvent[] = sort(data.data, 'DESC')
    const paginated: [DomainEvent[]] = paginate(sorted, RESULTS_PER_PAGE)

    return (
        <Container mainTitle="Daily Analytics">
            <ChartContainer title={QUEUE_NAME}>
                <BarChart
                    data={paginated}
                    horizontal={horizontal}
                    name={QUEUE_NAME}
                    range={sorted[0].count}
                    resultsPerPage={RESULTS_PER_PAGE}
                    totalResults={data.data.length}
                    type="bar"
                />
            </ChartContainer>
        </Container>
    )
}

export default Home
