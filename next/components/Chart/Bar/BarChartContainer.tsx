import React, { useEffect, useState } from 'react'

import BarChart from '@/components/Chart/Bar/BarChart'
import BarChartContainerFooter from '@/components/Chart/Bar/BarChartContainerFooter'
import BarChartContainerHeader from '@/components/Chart/Bar/BarChartContainerHeader'
import BarChartSkeleton from '@/components/Chart/Bar/BarChartSkeleton'
import BarChartEmpty from '@/components/Chart/Bar/BarChartEmpty'
import { diff, paginate, sort } from '@/util/data'

import type { SortDirection, DomainEventSeriesData, GetEventsResponse, Orientation, DomainEvent } from 'types'

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
    const [pages, setPages] = useState<[DomainEvent[]] | [[]]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(20)
    const [sortDirection, setSortDirection] = useState<SortDirection>('DESC')
    const [totalResults, setTotalResults] = useState<number>(0)

    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data))
            setTotalResults(tData.Data.length)

            if (tData.Data.length > 0) {
                setRange(tData.Data[0].count)
            }
        }
    }, [tData])

    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data, resultsPerPage))
        }
    }, [tData, resultsPerPage])

    useEffect(() => {
        if (orientation === 'horizontal') {
            setResultsPerPage(20)
        }
    }, [orientation])

    useEffect(() => setCurrentPage(0), [resultsPerPage, sortDirection])

    if (tValidating || yValidating) {
        return (
            <div role="status" className="chart animate-pulse">
                <BarChartSkeleton orientation={orientation} />
            </div>
        )
    }

    if (tError || yError || tData.Data.length === 0) {
        return (
            <div className="chart">
                <BarChartEmpty />
            </div>
        )
    }

    // This is done on the current page instead of on the entire data set
    // to reduce scripting during initial page load and improve page performance.
    const page: DomainEventSeriesData[] = diff(pages[currentPage], yData.Data)

    return (
        <div className="chart">
            <div className="h-16 w-full">
                <BarChartContainerHeader
                    data={tData.Data}
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
                    data={page}
                    horizontal={orientation === 'horizontal'}
                    name={title}
                    range={range}
                    resultsPerPage={resultsPerPage}
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

                        setPages(paginate(tData.Data.reverse(), resultsPerPage))
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
                    orientation={orientation}
                    resultsPerPage={resultsPerPage}
                    sortDirection={sortDirection}
                    totalResults={totalResults}
                />
            </div>
        </div>
    )
}

export default BarChartContainer
