import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { DomainEvent } from 'types'

import Pagination from '@/components/Pagination/Pagination'
import { createSeries, horizontalBarGraphOptions } from '@/util/chart-helper'

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

const Chart = ({ data, name, range, resultsPerPage, totalResults, type }: ChartProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages] = useState<[DomainEvent[] | []]>(data)
    const [series, setSeries] = useState<{ options: ApexOptions; series: ApexOptions['series'] }>({
        options: {
            ...horizontalBarGraphOptions(range)
        },
        series: createSeries(data[0], name)
    })

    // Only re-render when the page changes
    useEffect(() => {
        setSeries({
            options: {
                ...horizontalBarGraphOptions(range)
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
                next={() => pages.length - 1 !== currentPage && setCurrentPage(currentPage + 1)}
                back={() => currentPage !== 0 && setCurrentPage(currentPage - 1)}
            />
            {series && (
                <ApexChart options={series.options} series={series.series} type={type} height={resultsPerPage * 30} />
            )}
        </>
    )
}

export default Chart
