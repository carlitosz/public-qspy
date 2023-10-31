import React, { useEffect, useState } from 'react'

import BarChart from '@/components/ApexChart/BarChart'
import Pagination from '@/components/Pagination/Pagination'
import { paginate, sort } from '@/util/paginate'

import ChartContainerHeader from '@/components/Layout/Containers/ChartContainerHeader'
import BarChartSkeleton from '@/components/ApexChart/BarChartSkeleton'
import EmptyChartMessage from '@/components/ApexChart/EmptyChartMessage'

import type { SortDirection, DomainEvent, GetEventsResponse, Orientation } from 'types'

interface ChartContainerProps {
    data: GetEventsResponse | undefined
    isLoading: boolean
    title: string
    withToolbar?: boolean
}

const ChartContainer = ({ data, isLoading, title, withToolbar = false }: ChartContainerProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [orientation, setOrientation] = useState<Orientation>('vertical')
    const [range, setRange] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEvent[] | []]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(20)
    const [sorted, setSorted] = useState<DomainEvent[]>([])
    const [sortDirection, setSortDirection] = useState<SortDirection>('DESC')
    const [totalResults, setTotalResults] = useState<number>(0)

    useEffect(() => {
        if (data) {
            const sorted = sort(data.Data, 'DESC', 'count')

            setSorted(sorted)
            setTotalResults(sorted.length)

            sorted.length > 0 ? setRange(sorted && sorted[0].count) : setRange(0)
        }
    }, [data])

    useEffect(() => {
        if (sorted.length > 0) {
            const paginated = paginate(sorted, resultsPerPage)
            setPages(paginated)
        }
    }, [sorted, resultsPerPage])

    useEffect(() => setCurrentPage(0), [resultsPerPage, sortDirection])

    if (isLoading || !pages || !data) {
        return (
            <div role="status" className="flex flex-col border border-neutral-200 rounded-xl bg-neutral-50 h-max">
                <BarChartSkeleton orientation={orientation} />
            </div>
        )
    }

    if (totalResults === 0) {
        return (
            <div className="border border-neutral-200 rounded-xl bg-neutral-50 h-full">
                <EmptyChartMessage />
            </div>
        )
    }

    return (
        <div className="flex flex-col border border-neutral-200 rounded-xl bg-neutral-50 h-full">
            <ChartContainerHeader
                data={sorted}
                changeOrientation={(desiredOrientation: Orientation) => {
                    if (desiredOrientation === orientation) {
                        return
                    }

                    setOrientation(desiredOrientation)
                }}
                orientation={orientation}
                title={title}
                withToolbar={withToolbar}
            />
            <Pagination
                changeResultsPerPage={(desiredResultsPerPage: number) => {
                    if (desiredResultsPerPage === resultsPerPage) {
                        return
                    }

                    setResultsPerPage(desiredResultsPerPage)
                }}
                changeSortDirection={(desiredSortDirection: SortDirection) => {
                    if (desiredSortDirection === sortDirection) {
                        return
                    }

                    setPages(paginate(sorted.reverse(), resultsPerPage))
                    setSortDirection(desiredSortDirection)
                }}
                currentPage={currentPage}
                currentPageTotal={pages[currentPage].length}
                goToPage={(desiredPage: number) => {
                    if (desiredPage < 0 || desiredPage >= pages.length) {
                        return
                    }

                    setCurrentPage(desiredPage)
                }}
                numPages={pages.length}
                resultsPerPage={resultsPerPage}
                sortDirection={sortDirection}
                totalResults={totalResults}
            />
            <BarChart
                data={pages[currentPage]}
                horizontal={orientation === 'horizontal'}
                name={title}
                range={range}
                type="bar"
            />
        </div>
    )
}

export default ChartContainer
