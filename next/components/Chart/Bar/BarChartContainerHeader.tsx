import ApexCharts from 'apexcharts'
import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'
import React from 'react'

import Toolbar from '@/components/Toolbar/Toolbar'
import { formattedJSONArray } from '@/util/data'

import { DomainEvent, Orientation } from 'types'

interface ImgUri {
    imgURI: string
}

interface blob {
    blob: Blob
}

interface ChartInstance {
    chart: ApexCharts
    group: string
    id: string
}

declare global {
    interface Window {
        Apex: {
            _chartInstances: [ChartInstance]
        }
    }
}

interface BarChartContainerHeaderProps {
    data: DomainEvent[] | []
    changeOrientation?: (desiredOrientation: Orientation) => void
    orientation: Orientation
    title: string
    withToolbar: boolean
}

const BarChartContainerHeader = ({
    changeOrientation,
    data,
    orientation,
    title,
    withToolbar
}: BarChartContainerHeaderProps): JSX.Element => {
    return (
        <div className="header">
            <p className="text-dark text-sm">{title}</p>
            {withToolbar && (
                <Toolbar
                    direction="down"
                    disabled={data.length === 0}
                    dropdown={[
                        { title: 'Orientation' },
                        {
                            icon: <ArrowsUpDownIcon className="menu-icon-sm" />,
                            label: 'Vertical',
                            selected: orientation === 'vertical',
                            onClick: () => changeOrientation && changeOrientation('vertical')
                        },
                        {
                            icon: <ArrowsRightLeftIcon className="menu-icon-sm" />,
                            label: 'Horizontal',
                            selected: orientation === 'horizontal',
                            onClick: () => changeOrientation && changeOrientation('horizontal')
                        },
                        { divider: true },
                        { title: 'Data' },
                        {
                            icon: <ClipboardDocumentListIcon className="menu-icon-sm" />,
                            label: 'Copy JSON',
                            onClick: () => navigator.clipboard.writeText(formattedJSONArray(data))
                        },
                        { divider: true },
                        { title: 'Save as image' },
                        {
                            icon: <PhotoIcon className="menu-icon-sm" />,
                            label: 'PNG',
                            onClick: async () => {
                                const chartInstance: ChartInstance | undefined = window.Apex._chartInstances.find(
                                    (chart: ApexChart | undefined) => {
                                        if (chart && chart.id === title) return chart
                                    }
                                )

                                if (!chartInstance) {
                                    return
                                }

                                const { chart }: { chart: ChartInstance['chart'] } = chartInstance
                                const data: ImgUri | blob = await chart.dataURI()

                                const a = document.createElement('a')
                                a.download = title + '.png'
                                a.href = (data as ImgUri).imgURI
                                a.click()
                            }
                        }
                    ]}
                />
            )}
        </div>
    )
}

export default BarChartContainerHeader
