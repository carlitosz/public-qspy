import ApexCharts from 'apexcharts'
import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'
import React from 'react'

import Toolbar from '@/components/Toolbar/Toolbar'
import { formattedJSONArray } from '@/util/paginate'

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

const iconClass = 'h-5 w-5 mr-3 antialiased'

const BarChartContainerHeader = ({
    changeOrientation,
    data,
    orientation,
    title,
    withToolbar
}: BarChartContainerHeaderProps): JSX.Element => {
    return (
        <div className="flex flex-row justify-between items-center border-b px-4 py-2">
            <p className="text-neutral-600 text-sm font-medium antialiased">{title}</p>
            {withToolbar && (
                <Toolbar
                    disabled={data.length === 0}
                    dropdown={[
                        { title: 'Orientation' },
                        {
                            icon: <ArrowsUpDownIcon className={iconClass} />,
                            label: 'Vertical',
                            selected: orientation === 'vertical',
                            onClick: () => changeOrientation && changeOrientation('vertical')
                        },
                        {
                            icon: <ArrowsRightLeftIcon className={iconClass} />,
                            label: 'Horizontal',
                            selected: orientation === 'horizontal',
                            onClick: () => changeOrientation && changeOrientation('horizontal')
                        },
                        { divider: true },
                        { title: 'Data' },
                        {
                            icon: <ClipboardDocumentListIcon className={iconClass} />,
                            label: 'Copy JSON',
                            onClick: () => navigator.clipboard.writeText(formattedJSONArray(data))
                        },
                        { divider: true },
                        { title: 'Save as image' },
                        {
                            icon: <PhotoIcon className={iconClass} />,
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