import React from 'react'
import AnalyticsPercent from '@/components/Analytics/AnalyticsPercent'

interface AnalyticsCardProps {
    primaryMetric: number | string
    secondaryMetric?: number
    secondaryMetricColor?: 'text-danger' | 'text-success'
    secondaryMetricType?: 'number' | 'percent'
    subtext: string
    title: string
}

const AnalyticsCard = ({
    primaryMetric,
    secondaryMetric,
    secondaryMetricColor,
    secondaryMetricType,
    subtext,
    title
}: AnalyticsCardProps): JSX.Element => {
    return (
        <div className="card">
            <p className="text-md text-title font-semibold antialiased">{title}</p>
            <p className="text-primary font-medium text-3xl my-5 antialiased">{primaryMetric.toLocaleString()}</p>
            <div className="flex items-center justify-start">
                <>
                    {secondaryMetricType === 'number' && <></>}
                    {secondaryMetricType === 'percent' && (
                        <AnalyticsPercent metric={secondaryMetric} metricColor={secondaryMetricColor} />
                    )}
                </>
                <span className="text-sm text-title antialiased break-all">{subtext}</span>
            </div>
        </div>
    )
}

export default AnalyticsCard
