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
        colors: ['#4f46e5', '#818cf8'],
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
            events: {
                dataPointMouseEnter: function (event) {
                    event.target.style.cursor = 'pointer'
                }
            },
            fontFamily: 'Poppins',
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false,
            textAnchor: 'middle'
        },
        fill: {
            opacity: 0.9
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
                barHeight: '60%', // Horizontal
                borderRadius: 2,
                columnWidth: '80%', // Vertical
                borderRadiusApplication: 'end',
                distributed: true,
                horizontal: horizontal
            }
        },
        tooltip: {
            custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) => {
                return ReactDomServer.renderToString(
                    <ChartTooltip data={w.globals.initialSeries[seriesIndex].data[dataPointIndex]} />
                )
            },
            enabled: true,
            followCursor: true,
            intersect: true,
            shared: false
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                show: true,
                width: 1,
                opacity: 1
            },
            labels: {
                show: horizontal
            },
            tickAmount: range + 1
        },
        yaxis: {
            axisBorder: {
                show: true
            },
            crosshairs: {
                show: true,
                position: 'front',
                stroke: {
                    width: 1
                }
            },
            min: 0,
            max: range + 1,
            labels: {
                show: true,
                maxWidth: 200
            },
            tickAmount: range + 1
        }
    }
}
