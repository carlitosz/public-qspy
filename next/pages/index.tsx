import React, { useState } from 'react'

import BarChart from '@/components/ApexChart/BarChart'
import Container from '@/components/Layout/Containers/Container'
import ChartContainer from '@/components/Layout/Containers/ChartContainer'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { getErrorMessage, request } from '@/util/axios'
import { paginate, sort } from '@/util/paginate'

import type { NextPage } from 'next'
import type { DomainEvent, GetEventsResponse, Orientation } from 'types'

const Home: NextPage = () => {
    const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'

    const [orientation, setOrientation] = useState<Orientation>('vertical')
    const [resultsPerPage, setResultsPerPage] = useState<number>(20)
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
                <ChartContainer title={QUEUE_NAME}>
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
                <ChartContainer title={QUEUE_NAME}>
                    <div className="flex justify-center align-center py-12 bg-neutral-100">
                        <p className="text-xl">No results returned :\</p>
                    </div>
                </ChartContainer>
            </Container>
        )
    }

    const sorted: DomainEvent[] = sort(data.data, 'DESC')
    const paginated: [DomainEvent[]] = paginate(sorted, resultsPerPage)

    return (
        <Container mainTitle="Daily Analytics">
            <ChartContainer
                changeOrientation={(desiredOrientation: Orientation) => {
                    if (desiredOrientation === orientation) {
                        return
                    }

                    setOrientation(desiredOrientation)
                }}
                changeResultsPerPage={(desiredResultsPerPage: number) => {
                    if (desiredResultsPerPage === resultsPerPage) {
                        return
                    }

                    setResultsPerPage(desiredResultsPerPage)
                }}
                orientation={orientation}
                resultsPerPage={resultsPerPage}
                title={QUEUE_NAME}
                totalResults={sorted.length}
                withToolbar={true}
            >
                <BarChart
                    data={paginated}
                    horizontal={orientation === 'horizontal'}
                    name={QUEUE_NAME}
                    range={sorted[0].count}
                    resultsPerPage={resultsPerPage}
                    totalResults={sorted.length}
                    type="bar"
                />
            </ChartContainer>
        </Container>
    )
}

export default Home
