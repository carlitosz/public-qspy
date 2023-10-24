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
export const horizontalBarGraphOptions = (id: string, range: number, horizontal: boolean): ApexOptions => {
    return {
        colors: ['#4f46e5', '#a5b4fc'],
        chart: {
            id,
            animations: {
                easing: 'easeinout',
                speed: 200,
                dynamicAnimation: {
                    speed: 200
                },
                animateGradually: {
                    enabled: true
                }
            },
            toolbar: {
                show: false,
                export: {
                    png: {
                        filename: `${id}-chart.png`
                    }
                }
            }
        },
        dataLabels: {
            enabled: true
        },
        fill: {
            opacity: 0.98
        },
        grid: {
            position: 'back',
            yaxis: {
                lines: {
                    show: !horizontal
                }
            },
            xaxis: {
                lines: {
                    show: horizontal
                }
            }
        },
        legend: {
            show: false
        },
        plotOptions: {
            bar: {
                barHeight: '80%', // Vertical
                borderRadius: 2,
                columnWidth: '70%', // Horizontal
                borderRadiusApplication: 'end',
                distributed: true,
                horizontal: horizontal
                // colors: {
                //     ranges: [
                //         {
                //             from: range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5,
                //             to: range,
                //             color: '#4338ca'
                //         },
                //         {
                //             from: range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5,
                //             to: (range % 1.5 > 0 ? Math.ceil(range / 1.5) : range / 1.5) - 1,
                //             color: '#1d4ed8'
                //         },
                //         {
                //             from: range % 3.5 > 0 ? Math.ceil(range / 3.5) : range / 3.5,
                //             to: (range % 2.5 > 0 ? Math.ceil(range / 2.5) : range / 2.5) - 1,
                //             color: '#6366f1'
                //         },
                //         {
                //             from: 0,
                //             to: (range % 3.5 > 0 ? Math.ceil(range / 3.5) : range / 3.5) - 1,
                //             color: '#2563eb'
                //         }
                //     ]
                // }
            }
        },
        tooltip: {
            enabled: true,
            followCursor: true,
            fillSeriesColor: true,
            intersect: true,
            onDatasetHover: {
                highlightDataSeries: true
            },
            custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) => {
                return ReactDomServer.renderToString(
                    <ChartTooltip data={w.globals.initialSeries[seriesIndex].data[dataPointIndex]} />
                )
            }
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false
            },
            tickAmount: range
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            min: 0,
            max: range,
            labels: {
                maxWidth: 250
            }
        }
    }
}
