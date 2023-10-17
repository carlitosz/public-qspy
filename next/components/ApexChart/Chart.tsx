import React, { useState, useEffect } from 'react'
import ReactDomServer from 'react-dom/server'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { DomainEvent } from 'types'

import ChartTooltip from '@/components/ApexChart/ChartTooltip'
import Pagination from '@/components/Pagination/Pagination'
import { createSeries } from '@/util/chart'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface ChartProps {
    data: [DomainEvent[]] | [[]]
    name: string
    range: number
    resultsPerPage: number
    totalResults: number
    type:
        | 'line'
        | 'area'
        | 'bar'
        | 'pie'
        | 'donut'
        | 'radialBar'
        | 'scatter'
        | 'bubble'
        | 'heatmap'
        | 'candlestick'
        | 'boxPlot'
        | 'radar'
        | 'polarArea'
        | 'rangeBar'
        | 'rangeArea'
        | 'treemap'
}

const options = {
    chart: {
        id: 'bar-chart',
        toolbar: {
            show: false
        }
    },
    plotOptions: {
        bar: {
            horizontal: true
        }
    },
    responsive: [
        {
            breakpoint: 390,
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false
                    }
                }
            }
        }
    ],
    tooltip: {
        custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) => {
            return ReactDomServer.renderToString(
                <ChartTooltip data={w.globals.initialSeries[seriesIndex].data[dataPointIndex]} />
            )
        },
        intersect: true,
        marker: {
            show: true
        }
    }
}

const Chart = ({ data, name, range, resultsPerPage, totalResults, type }: ChartProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages] = useState<[DomainEvent[] | []]>(data)
    const [series, setSeries] = useState<{ options: ApexOptions; series: ApexOptions['series'] }>({
        options: {
            ...options,
            plotOptions: {
                bar: {
                    colors: {
                        ranges: [
                            {
                                from: range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5,
                                to: range,
                                color: '#e11d48'
                            },
                            {
                                from: range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5,
                                to: (range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5) - 1,
                                color: '#fb923c'
                            },
                            {
                                from: 0,
                                to: (range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5) - 1,
                                color: '#22c55e'
                            }
                        ]
                    }
                }
            },
            yaxis: {
                min: 0,
                max: range + 1
            }
        },
        series: createSeries(data[0], name)
    })

    // Only re-render when the page changes
    useEffect(() => {
        setSeries({
            options: {
                ...options,
                yaxis: {
                    min: 0,
                    max: range + 1
                }
            },
            series: createSeries(pages[currentPage], name)
        })
    }, [currentPage])

    return (
        <>
            <Pagination
                startIndex={currentPage * resultsPerPage}
                endIndex={currentPage * resultsPerPage + pages[currentPage].length}
                total={totalResults}
                next={() => {
                    if (pages.length - 1 === currentPage) {
                        return
                    }

                    setCurrentPage(currentPage + 1)
                }}
                back={() => {
                    if (currentPage === 0) {
                        return
                    }

                    setCurrentPage(currentPage - 1)
                }}
            />
            {series && (
                <ApexChart options={series.options} series={series.series} type={type} height={resultsPerPage * 30} />
            )}
        </>
    )
}

export default Chart
