import React from 'react'

import Pill from '@/components/Pill/Pill'
import { analyticsPillColor, analyticsPillIcon } from '@/data-layers/Analytics'

interface AnalyticsCardProps {
    percentOfChange?: number
    title: string
    metric: number | string
}

const AnalyticsCard = ({ metric, percentOfChange, title }: AnalyticsCardProps): JSX.Element => {
    return (
        <div className="ring-1 ring-border rounded-md bg-component h-full w-full p-4">
            <p className="text-primary font-semibold text-4xl antialiased">{metric.toLocaleString()}</p>
            <div className="flex items-center justify-between w-full mt-2">
                <p className="text-sm text-title font-semibold antialiased">{title}</p>
                {typeof percentOfChange === 'number' && (
                    <Pill
                        color={analyticsPillColor(percentOfChange)}
                        icon={analyticsPillIcon(percentOfChange)}
                        label={`${Math.abs(percentOfChange).toFixed(0)}%`}
                        style="solid"
                    />
                )}
            </div>
        </div>
    )
}

export default AnalyticsCard
