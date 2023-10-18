import React, { useState } from 'react'

import BarChart from '@/components/ApexChart/BarChart'
import Container from '@/components/Layout/Containers/Container'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { getErrorMessage, request } from '@/util/axios'
import { paginate, sort } from '@/util/paginate'

import type { NextPage } from 'next'
import type { DomainEvent, GetEventsResponse } from 'types'

interface HomePageProps {}

const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
const RESULTS_PER_PAGE = 25

const Home: NextPage<HomePageProps> = ({}: HomePageProps) => {
    const [horizontal, setHorizontal] = useState<boolean>(true)
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
            <Container>
                <div className="flex justify-center align-center py-12 bg-neutral-100">
                    <p className="text-xl">{message}</p>
                </div>
            </Container>
        )
    }

    if (!data || isValidating) {
        return (
            <Container>
                <ChartSkeleton />
            </Container>
        )
    }

    if (data.data.length === 0) {
        return (
            <Container>
                <div className="flex justify-center align-center py-12 bg-neutral-100">
                    <p className="text-xl">No results returned :\</p>
                </div>
            </Container>
        )
    }

    const sorted: DomainEvent[] = sort(data.data, 'DESC')
    const paginated: [DomainEvent[]] = paginate(sorted, RESULTS_PER_PAGE)

    return (
        <Container>
            <p className="text-neutral-500 border-b border-gray-200 text-sm font-semibold antialiased pb-4">
                {QUEUE_NAME}
            </p>
            <BarChart
                data={paginated}
                horizontal={horizontal}
                name={QUEUE_NAME}
                range={sorted[0].count}
                resultsPerPage={RESULTS_PER_PAGE}
                totalResults={data.data.length}
                type="bar"
            />
        </Container>
    )
}

export default Home
