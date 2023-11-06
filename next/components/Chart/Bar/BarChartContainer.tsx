import React, { useEffect, useState } from 'react'

import BarChart from '@/components/Chart/Bar/BarChart'
import { paginate, sort } from '@/util/paginate'

import BarChartContainerHeader from '@/components/Chart/Bar/BarChartContainerHeader'
import BarChartSkeleton from '@/components/Chart/Bar/BarChartSkeleton'
import BarChartEmpty from '@/components/Chart/Bar/BarChartEmpty'

import type { SortDirection, DomainEvent, GetEventsResponse, Orientation } from 'types'
import BarChartContainerFooter from './BarChartContainerFooter'

interface ChartContainerProps {
    data: GetEventsResponse | undefined
    isLoading: boolean
    title: string
    withToolbar?: boolean
}

const BarChartContainer = ({ data, isLoading, title, withToolbar = false }: ChartContainerProps): JSX.Element => {
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
            <div role="status" className="chart animate-pulse">
                <BarChartSkeleton orientation={orientation} />
            </div>
        )
    }

    if (totalResults === 0 && !data && !pages && !isLoading) {
        return (
            <div className="chart">
                <BarChartEmpty />
            </div>
        )
    }

    return (
        <div className="chart">
            <div className="h-16 w-full">
                <BarChartContainerHeader
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
            </div>
            <div className="h-full w-full">
                <BarChart
                    data={pages[currentPage]}
                    horizontal={orientation === 'horizontal'}
                    name={title}
                    range={range}
                    type="bar"
                />
            </div>
            <div className="h-16 w-full">
                <BarChartContainerFooter
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
            </div>
        </div>
    )
}

export default BarChartContainer
