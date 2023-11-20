import React from 'react'
import ReactDOMServer from 'react-dom/server'

import Tooltip from '@/components/Tooltip/Tooltip'

import type { ApexOptions } from 'apexcharts'
import type { SeriesDataPoint } from '@/util/series'

/**
 * Generates custom options for a bar graph.
 *
 * @param id            Unique id/name for the chart
 * @param max         The maximum value of the y axis
 * @param horizontal    Boolean indicating horizontal orientation
 * @param results       Number of results per page
 *
 * @returns ApexOptions
 */
export const horizontalBarGraphOptions = (
    id: string,
    max: number,
    horizontal: boolean,
    results: number
): ApexOptions => {
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
                    enabled: true,
                    speed: 200
                },
                animateGradually: {
                    enabled: false
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
            redrawOnWindowResize: true,
            redrawOnParentResize: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true,
                type: 'x',
                autoScaleYaxis: false,
                zoomedArea: {
                    fill: {
                        color: '#90CAF9',
                        opacity: 0.4
                    },
                    stroke: {
                        color: '#0D47A1',
                        opacity: 0.4,
                        width: 1
                    }
                }
            }
        },
        dataLabels: {
            enabled: false,
            style: {
                colors: [getComputedStyle(document.body).getPropertyValue('--color-page')]
            }
        },
        fill: {
            opacity: 0.85
        },
        grid: {
            borderColor: getComputedStyle(document.body).getPropertyValue('--color-border'),
            column: {
                colors: [getComputedStyle(document.body).getPropertyValue('--color-component')],
                opacity: 0.1
            },
            padding: {
                bottom: horizontal ? -10 : -43,
                right: horizontal ? 20 : 0,
                top: horizontal ? -30 : -31,
                left: horizontal ? 20 : 13
            },
            position: 'back',
            row: {
                colors: [getComputedStyle(document.body).getPropertyValue('--color-page')],
                opacity: 0.1
            },
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
            cssClass: 'custom-tooltip',
            enabled: true,
            followCursor: true,
            intersect: true,
            shared: false,
            theme: false
        },
        xaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            min: 0,
            max: max + 10,
            labels: {
                show: true,
                offsetX: -5,
                formatter: (val: string) => {
                    const value = parseInt(val)

                    if (value === 0) {
                        return ''
                    }

                    return value.toFixed(0)
                },
                style: {
                    colors: [getComputedStyle(document.body).getPropertyValue('--color-title')]
                }
            },
            tickAmount: results
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            min: 0,
            max: max + 10,
            labels: {
                show: true,
                offsetY: horizontal ? 2 : -3,
                offsetX: horizontal ? 5 : 0,
                minWidth: horizontal ? 200 : 25,
                maxWidth: horizontal ? 200 : 20,
                formatter: (val: number) => {
                    if (val === 0) {
                        return ''
                    }

                    if (typeof val === 'number') {
                        return val.toFixed(0)
                    }

                    return val
                },
                style: {
                    colors: [getComputedStyle(document.body).getPropertyValue('--color-title')]
                }
            },
            tickAmount: horizontal ? max : undefined
        }
    }
}
