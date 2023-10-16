import React, { useState } from 'react'
import dynamic from 'next/dynamic'

import type { ApexOptions } from 'apexcharts'
import type { DomainEvent } from 'types'

const ApexChart = dynamic(() => import('react-apexcharts').then((res) => res.default), { ssr: false })

interface ChartProps {
    breakLabels: boolean
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
            },
            tooltip: {
                custom: ({ seriesIndex, dataPointIndex, w }) => {
                    var data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]

                    return `<div class="block rounded-md bg-white text-center shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]">
                                <div class="flex items-center justify-center border-b-2 border-neutral-100 px-4 py-3">
                                    <p class="ml-3 text-sm tracking-tight antialiased text-neutral-600">${data.x}</p>
                                </div>
                                <div class="px-3 py-3">
                                    <p class="text-xl">${data.y}</p>
                                    <p class="text-sm tracking-tight antialiased text-neutral-600">
                                        Occurrences
                                    </p>
                                </div>
                            </div>`
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

                    return { x: name, y: d.count }
                })
            }
        ]
    })

    return <ApexChart options={_data.options} series={_data.series} type={type} />
}

export default Chart
