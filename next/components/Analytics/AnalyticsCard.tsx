import React from 'react'
import AnalyticsPercent from '@/components/Analytics/AnalyticsPercent'

interface AnalyticsCardProps {
    difference?: {
        metric: number
        color?: 'danger' | 'success' | 'neutral'
        type: 'number' | 'percent'
    }
    title: string
    metric: number | string
}

const AnalyticsCard = ({ difference, metric, title }: AnalyticsCardProps): JSX.Element => {
    return (
        <div className="ring-1 ring-border rounded-md bg-component h-full w-full p-4">
            <p className="text-primary font-semibold text-4xl antialiased">{metric.toLocaleString()}</p>
            <div className="flex items-center justify-between w-full mt-2">
                <p className="text-sm text-title font-semibold antialiased">{title}</p>
                {difference && difference.type === 'percent' && (
                    <AnalyticsPercent percent={difference.metric} color={difference.color} />
                )}
            </div>
            <div className=""></div>
        </div>
    )
}

export default AnalyticsCard
