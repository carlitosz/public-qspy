import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { DomainEvent } from 'types'

import Pagination from '@/components/Pagination/Pagination'
import { createSeries, horizontalBarGraphOptions } from '@/util/chart-helper'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface BarChartProps {
    data: [DomainEvent[]] | [[]]
    horizontal: boolean
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

const BarChart = ({
    data,
    horizontal,
    name,
    range,
    resultsPerPage,
    totalResults,
    type
}: BarChartProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEvent[] | []]>(data)
    const [series, setSeries] = useState<{ options: ApexOptions; series: ApexOptions['series'] }>({
        options: {
            ...horizontalBarGraphOptions(range, horizontal)
        },
        series: createSeries(data[0], name)
    })

    useEffect(() => {
        setSeries({
            options: {
                ...horizontalBarGraphOptions(range, horizontal)
            },
            series: createSeries(pages[currentPage], name)
        })
    }, [currentPage, horizontal, name, pages, range])

    useEffect(() => setPages(data), [data])
    useEffect(() => setCurrentPage(0), [resultsPerPage])

    return (
        <div className="px-4">
            <Pagination
                currentPage={currentPage}
                currentPageTotal={pages[currentPage].length}
                goToPage={(desiredPage: number) => {
                    if (desiredPage < 0 || desiredPage >= pages.length) {
                        return
                    }

                    setCurrentPage(desiredPage)
                }}
                numPages={pages.length}
                totalResults={totalResults}
            />
            {series && (
                <ApexChart
                    options={series.options}
                    series={series.series}
                    type={type}
                    height={horizontal ? pages[currentPage].length * 25 : 600}
                />
            )}
        </div>
    )
}

export default BarChart
