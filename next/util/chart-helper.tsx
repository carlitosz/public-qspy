import ReactDomServer from 'react-dom/server'

import ChartTooltip from '@/components/ApexChart/ChartTooltip'

import { ApexOptions } from 'apexcharts'
import { DomainEvent } from 'types'

/**
 * Creates a series array of [{x: x-value, y: y-value }, { ... }]
 *
 * @param data An array of domain events
 * @param name The name of the series
 *
 * @returns ApexOptions['series']
 */
export const createSeries = (data: DomainEvent[], name: string): ApexOptions['series'] => {
    return [
        {
            name,
            data: data.map((d: DomainEvent) => {
                var split = d.event.split('\\')
                const name: string = split.pop() ?? ''

                return { x: name, y: d.count }
            })
        }
    ]
}

/**
 * Generates custom options for a horizontal bar graph.
 *
 * @param range The maximum value of the y axis
 *
 * @returns ApexOptions
 */
export const horizontalBarGraphOptions = (range: number): ApexOptions => {
    return {
        chart: {
            id: 'bar-chart',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
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
        },
        yaxis: {
            min: 0,
            max: range + 1
        }
    }
}
