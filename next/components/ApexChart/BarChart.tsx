import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { Props } from 'react-apexcharts'
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
    type: Props['type']
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
    const [options, setOptions] = useState<ApexOptions>(horizontalBarGraphOptions(name, range, horizontal))
    const [series, setSeries] = useState<ApexOptions['series']>(createSeries(data[0], name))

    useEffect(() => {
        setSeries(createSeries(pages[currentPage], name))
    }, [currentPage, name, pages])

    useEffect(() => {
        setOptions(horizontalBarGraphOptions(name, range, horizontal))
    }, [name, range, horizontal])

    useEffect(() => setPages(data), [data])
    useEffect(() => setCurrentPage(0), [resultsPerPage])

    return (
        <div className="px-4" id="stuff">
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
            {series && <ApexChart options={options} series={series} type={type} height={550} />}
        </div>
    )
}

export default BarChart
