import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { DomainEvent } from 'types'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface ChartProps {
    data: DomainEvent[]
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

const Chart = ({ data, type }: ChartProps): JSX.Element => {
    const [_data, setData] = useState<{ options: ApexOptions; series: ApexOptions['series'] }>({
        options: {
            chart: {
                id: 'bar-chart'
            },
            plotOptions: {
                bar: {
                    horizontal: true
                }
            }
        },
        series: [
            {
                name: 'Deadletters',
                data: data.map((d: DomainEvent) => {
                    var split = d.event.split('\\')
                    const name: string = split.pop() ?? ''
                    const prefix: string = split.pop() ?? ''

                    return { x: `${prefix}\\${name}`, y: d.count }
                })
            }
        ]
    })

    return <ApexChart options={_data.options} series={_data.series} type={type} />
}

export default Chart
