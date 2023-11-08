import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { Props } from 'react-apexcharts'
import type { DomainEventSeriesData } from 'types'

import { createSeries } from '@/util/series'
import { horizontalBarGraphOptions } from '@/util/options'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface BarChartProps {
    data: DomainEventSeriesData[]
    horizontal: boolean
    name: string
    range: number
    type: Props['type']
}

const BarChart = ({ data, horizontal, name, range, type }: BarChartProps): JSX.Element => {
    const [options, setOptions] = useState<ApexOptions>(horizontalBarGraphOptions(name, range, horizontal))
    const [series, setSeries] = useState<ApexOptions['series']>(createSeries(data, name))

    useEffect(() => {
        setSeries(createSeries(data, name))
    }, [data, name])

    useEffect(() => {
        setOptions(horizontalBarGraphOptions(name, range, horizontal))
    }, [name, range, horizontal])

    return (
        <div className="h-full">
            <ApexChart options={options} series={series} type={type} height="100%" />
        </div>
    )
}

export default BarChart
