import React from 'react'
import ArrowsUpDownIcon from '@heroicons/react/24/outline/ArrowsUpDownIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ClipboardDocumentListIcon from '@heroicons/react/24/outline/ClipboardDocumentListIcon'
import PhotoIcon from '@heroicons/react/24/outline/PhotoIcon'

import Toolbar from '@/components/ApexChart/Toolbar/Toolbar'

interface ChartContainerProps {
    children: JSX.Element | JSX.Element[]
    title: string
    withToolbar?: boolean
}

const iconClass = 'h-5 w-5 mr-3 antialiased'

const ChartContainer = ({ children, title, withToolbar = false }: ChartContainerProps): JSX.Element => {
    return (
        <div className="border border-neutral-200 rounded-xl bg-neutral-50">
            <div className="flex flex-row justify-between items-center border-b p-4">
                <p className="text-neutral-600 text-sm font-medium antialiased">{title}</p>
                {withToolbar && (
                    <Toolbar
                        actions={[]}
                        dropdown={[
                            { title: 'Orientation' },
                            { icon: <ArrowsUpDownIcon className={iconClass} />, label: 'Vertical' },
                            { icon: <ArrowsRightLeftIcon className={iconClass} />, label: 'Horizontal' },
                            { divider: true },
                            { title: 'Data' },
                            { icon: <ClipboardDocumentListIcon className={iconClass} />, label: 'Copy JSON' },
                            { divider: true },
                            { title: 'Save as image' },
                            { icon: <PhotoIcon className={iconClass} />, label: 'PNG' },
                            { icon: <PhotoIcon className={iconClass} />, label: 'JPG' },
                            { icon: <PhotoIcon className={iconClass} />, label: 'SVG' }
                        ]}
                    />
                )}
            </div>
            {children}
        </div>
    )
}

export default ChartContainer
