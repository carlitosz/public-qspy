import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Tooltip from '@/components/Tooltip/Tooltip'

import type { ApexOptions } from 'apexcharts'
import type { SeriesDataPoint } from '@/util/series'

/**
 * Generates custom options for a horizontal bar graph.
 *
 * @param id            Unique id/name for the chart
 * @param range         The maximum value of the y axis
 * @param horizontal    Boolean indicating horizontal orientation
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
                dataPointMouseEnter: (event: MouseEvent): void => {
                    if (event.target) {
                        const target = event.target as HTMLElement
                        target.style.cursor = 'pointer'
                    }
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
            borderColor: getComputedStyle(document.body).getPropertyValue('--color-extralight'),
            padding: {
                bottom: horizontal ? -15 : -33,
                right: horizontal ? 20 : 0,
                top: horizontal ? -30 : -31,
                left: horizontal ? 20 : -25
            },
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
                borderRadius: 3,
                borderRadiusApplication: 'end',
                columnWidth: '70%', // Vertical
                distributed: true,
                horizontal: horizontal
            }
        },
        states: {
            hover: {
                filter: {
                    type: 'none'
                }
            }
        },
        tooltip: {
            custom: ({ seriesIndex, dataPointIndex, w }: { seriesIndex: number; dataPointIndex: number; w: any }) => {
                const data: SeriesDataPoint = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
                return ReactDOMServer.renderToString(<Tooltip meta={data.meta} x={data.x} y={data.y} />)
            },
            enabled: true,
            followCursor: true,
            intersect: true,
            shared: false
        },
        xaxis: {
            axisBorder: {
                show: false,
                color: getComputedStyle(document.body).getPropertyValue('--color-light')
            },
            axisTicks: {
                show: false
            },
            labels: {
                show: false,
                style: {
                    colors: [getComputedStyle(document.body).getPropertyValue('--color-primary')],
                    fontWeight: 500
                }
            },
            tickAmount: range + 1
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            min: 0,
            max: range + 1,
            labels: {
                show: horizontal,
                offsetY: horizontal ? 2 : -3,
                offsetX: horizontal ? 5 : -3,
                minWidth: horizontal ? 200 : 25,
                maxWidth: horizontal ? 350 : 25,
                formatter: (val: number) => {
                    if (val === 0) {
                        return ''
                    }

                    if (typeof val === 'number') {
                        return val.toFixed(0)
                    }

                    return val
                },
                style: horizontal
                    ? {}
                    : {
                          colors: [getComputedStyle(document.body).getPropertyValue('--color-primary')],
                          fontWeight: 500
                      }
            },
            tickAmount: range + 1
        }
    }
}
