import ApexCharts from 'apexcharts'
import React from 'react'
import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import DocumentChartBarIcon from '@heroicons/react/24/outline/DocumentChartBarIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'

import Toolbar from '@/components/ApexChart/Toolbar/Toolbar'

import type { Orientation } from 'types'

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
    // eslint-disable-next-line no-unused-vars
    interface Window {
        Apex: {
            _chartInstances: [ChartInstance]
        }
    }
}

interface ChartContainerProps {
    changeOrientation?: (desiredOrientation: Orientation) => void
    changeResultsPerPage?: (desiredResultsPerPage: number) => void
    children: JSX.Element | JSX.Element[]
    orientation?: Orientation
    resultsPerPage?: number
    title: string
    totalResults?: number
    withToolbar?: boolean
}

const iconClass = 'h-5 w-5 mr-3 antialiased'

const ChartContainer = ({
    changeOrientation,
    changeResultsPerPage,
    children,
    orientation,
    resultsPerPage,
    totalResults,
    title,
    withToolbar = false
}: ChartContainerProps): JSX.Element => {
    return (
        <div className="border border-neutral-200 rounded-xl bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b p-4">
                <p className="text-neutral-600 text-sm font-medium antialiased">{title}</p>
                {withToolbar && (
                    <Toolbar
                        dropdown={[
                            { title: 'Results per page' },
                            {
                                icon: <DocumentChartBarIcon className={iconClass} />,
                                label: 20,
                                onClick: () => changeResultsPerPage && changeResultsPerPage(20),
                                selected: resultsPerPage === 20
                            },
                            {
                                icon: <DocumentChartBarIcon className={iconClass} />,
                                label: 30,
                                onClick: () => changeResultsPerPage && changeResultsPerPage(30),
                                selected: resultsPerPage === 30
                            },
                            {
                                icon: <DocumentChartBarIcon className={iconClass} />,
                                label: 40,
                                onClick: () => changeResultsPerPage && changeResultsPerPage(40),
                                selected: resultsPerPage === 40
                            },
                            {
                                icon: <DocumentChartBarIcon className={iconClass} />,
                                label: `All (${totalResults})`,
                                onClick: () =>
                                    changeResultsPerPage && totalResults && changeResultsPerPage(totalResults),
                                selected: resultsPerPage === totalResults
                            },
                            { divider: true },
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
                            { icon: <ClipboardDocumentListIcon className={iconClass} />, label: 'Copy JSON' },
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
            {children}
        </div>
    )
}

export default ChartContainer
