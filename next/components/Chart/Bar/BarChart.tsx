import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import { createSeries } from '@/util/series'
import { horizontalBarGraphOptions } from '@/util/options'

import type { ApexOptions } from 'apexcharts'
import type { Props } from 'react-apexcharts'
import type { DomainEventSeriesData } from 'types'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface BarChartProps {
    data: DomainEventSeriesData[]
    horizontal: boolean
    max: number
    name: string
    resultsPerPage: number
    type: Props['type']
}

const BarChart = ({ data, horizontal, max, name, resultsPerPage, type }: BarChartProps): JSX.Element => {
    const [options, setOptions] = useState<ApexOptions>(
        horizontalBarGraphOptions(name, max, horizontal, resultsPerPage)
    )
    const [series, setSeries] = useState<ApexOptions['series']>(createSeries(data, name))

    useEffect(() => {
        setSeries(createSeries(data, name))
    }, [data, name])

    useEffect(() => {
        setOptions(horizontalBarGraphOptions(name, max, horizontal, resultsPerPage))
    }, [name, max, horizontal, resultsPerPage])

    return (
        <div className="h-full">
            <ApexChart options={options} series={series} type={type} height="100%" />
        </div>
    )
}

export default BarChart
