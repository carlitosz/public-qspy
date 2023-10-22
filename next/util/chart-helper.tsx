import React from 'react'
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
export const horizontalBarGraphOptions = (range: number, horizontal: boolean): ApexOptions => {
    return {
        chart: {
            id: 'bar-chart',
            toolbar: {
                show: false
            },
            animations: {
                easing: 'easeinout',
                speed: 200,
                dynamicAnimation: {
                    speed: 200
                }
            }
        },
        dataLabels: {
            enabled: false
        },
        grid: {
            yaxis: {
                lines: {
                    show: false
                }
            },
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        plotOptions: {
            bar: {
                barHeight: '80%',
                borderRadius: 0,
                columnWidth: '80%',
                borderRadiusApplication: 'end',
                horizontal: horizontal,
                colors: {
                    ranges: [
                        {
                            from: range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5,
                            to: range,
                            color: '#4338ca'
                        },
                        {
                            from: range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5,
                            to: (range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5) - 1,
                            color: '#1d4ed8'
                        },
                        {
                            from: range % 3.5 > 0 ? Math.ceil(range / 3.5) : range / 3.5,
                            to: (range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5) - 1,
                            color: '#6366f1'
                        },
                        {
                            from: 0,
                            to: (range % 3.5 > 0 ? Math.ceil(range / 3.5) : range / 3.5) - 1,
                            color: '#2563eb'
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
            marker: {
                show: true
            }
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            labels: {
                show: false
            },
            tickAmount: 10
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            min: 0,
            max: range,
            labels: {
                maxWidth: 250
            }
        }
    }
}
