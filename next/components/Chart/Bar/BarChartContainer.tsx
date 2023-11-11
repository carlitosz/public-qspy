import React, { useEffect, useState } from 'react'

import BarChart from '@/components/Chart/Bar/BarChart'
import BarChartContainerFooter from '@/components/Chart/Bar/BarChartContainerFooter'
import BarChartContainerHeader from '@/components/Chart/Bar/BarChartContainerHeader'
import BarChartSkeleton from '@/components/Chart/Bar/BarChartSkeleton'
import BarChartEmpty from '@/components/Chart/Bar/BarChartEmpty'
import { diff, paginate, sort } from '@/util/data'

import type { SortDirection, DomainEventSeriesData, GetEventsResponse, Orientation } from 'types'

interface ChartContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
    title: string
    withToolbar?: boolean
}

const BarChartContainer = ({ data, title, withToolbar = false }: ChartContainerProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [orientation, setOrientation] = useState<Orientation>('vertical')
    const [range, setRange] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEventSeriesData[] | []]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(20)
    const [sorted, setSorted] = useState<DomainEventSeriesData[]>([])
    const [sortDirection, setSortDirection] = useState<SortDirection>('DESC')
    const [totalResults, setTotalResults] = useState<number>(0)

    const { data: todaysData, isValidating: todayValidating, error: todayError } = data.today
    const { data: yesterdaysData, isValidating: yesterdayValidating } = data.yesterday

    // Sort the data and calculate diffs
    useEffect(() => {
        if (todaysData && yesterdaysData) {
            const sorted = diff(sort(todaysData.Data, 'DESC', 'count'), yesterdaysData.Data)

            setSorted(sorted)
            setTotalResults(sorted.length)

            sorted.length > 0 ? setRange(sorted && sorted[0].count) : setRange(0)
        }
    }, [todaysData, yesterdaysData])

    // Paginate the sorted data
    useEffect(() => {
        if (sorted.length > 0) {
            setPages(paginate(sorted, resultsPerPage))
        }
    }, [sorted, resultsPerPage])

    // Go back to the first page when resultsPerPage or sortDirection changes
    useEffect(() => setCurrentPage(0), [resultsPerPage, sortDirection])

    if (todayValidating || yesterdayValidating || !todaysData || !yesterdaysData) {
        return (
            <div role="status" className="chart animate-pulse">
                <BarChartSkeleton orientation={orientation} />
            </div>
        )
    }

    if (todaysData.Total === 0 || todayError) {
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
