import React, { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { Props } from 'react-apexcharts'
import type { DomainEvent } from 'types'

import { createSeries, horizontalBarGraphOptions } from '@/util/chart'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface BarChartProps {
    data: DomainEvent[] | []
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

    return <>{series && <ApexChart options={options} series={series} type={type} height={600} />}</>
}

export default BarChart
