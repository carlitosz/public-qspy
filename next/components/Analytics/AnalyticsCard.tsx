import React from 'react'
import AnalyticsPercent from '@/components/Analytics/AnalyticsPercent'

interface AnalyticsCardProps {
    difference?: {
        metric: number
        color?: 'danger' | 'success' | 'neutral' | undefined
        type: 'number' | 'percent'
    }
    icon?: React.ReactNode
    title: string
    metric: number | string
}

const AnalyticsCard = ({ difference, icon, metric, title }: AnalyticsCardProps): JSX.Element => {
    return (
        <div className="ring-1 ring-border rounded-md bg-component h-full w-full p-4">
            <div className=" inline-flex w-full">
                {icon}
                <p className="text-md text-title font-semibold antialiased ">{title}</p>
            </div>
            <div className="  flex items-baseline justify-between text-sm w-full pt-4">
                <span className="text-primary font-medium text-4xl antialiased">{metric.toLocaleString()}</span>
                {difference && difference.type === 'percent' && (
                    <AnalyticsPercent percent={difference.metric} color={difference.color} />
                )}
            </div>
        </div>
    )
}

export default AnalyticsCard
