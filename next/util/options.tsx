import React from 'react'
import ReactDomServer from 'react-dom/server'

import Tooltip from '@/components/Tooltip/Tooltip'

import type { ApexOptions } from 'apexcharts'
import type { SeriesDataPoint } from '@/util/series'

/**
 * Generates custom options for a horizontal bar graph.
 *
 * @param range The maximum value of the y axis
 *
 * @returns ApexOptions
 */
export const horizontalBarGraphOptions = (id: string, range: number, horizontal: boolean): ApexOptions => {
    const colors = [
        getComputedStyle(document.body).getPropertyValue('--color-primary'),
        getComputedStyle(document.body).getPropertyValue('--color-secondary')
    ] as ApexOptions['colors']

    return {
        colors,
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
            opacity: 1
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
                const data: SeriesDataPoint = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
                return ReactDomServer.renderToString(<Tooltip meta={data.meta} x={data.x} y={data.y} />)
            },
            enabled: true,
            followCursor: true,
            intersect: true,
            shared: false
        },
        xaxis: {
            axisBorder: {
                show: true
            },
            axisTicks: {
                show: true
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
                maxWidth: 200,
                formatter: (val: number) => {
                    if (typeof val === 'number') {
                        return val.toFixed(0)
                    }

                    return val
                }
            },
            tickAmount: range + 1
        }
    }
}
