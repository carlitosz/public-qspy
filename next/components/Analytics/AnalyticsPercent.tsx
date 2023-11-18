import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'

interface AnalyticsPercentProps {
    metric: number
    metricColor?: 'text-danger' | 'text-success'
}

const AnalyticsPercent = ({ metric, metricColor }: AnalyticsPercentProps): JSX.Element => {
    return (
        <>
            {metric === 0 && (
                <>
                    <span className="text-text mr-2">0%</span>
                </>
            )}
            {metric > 0 && (
                <>
                    <ArrowLongUpIcon className={`analytics-icon-sm text-danger`} />
                    <span className="font-medium text-red-600 mr-1">{Math.abs(metric).toFixed(0)}%</span>
                </>
            )}
            {metric < 0 && (
                <>
                    <ArrowLongDownIcon className={`analytics-icon-sm ${metricColor}`} />
                    <span className="text-emerald-600 mr-1">{Math.abs(metric).toFixed(0)}%</span>
                </>
            )}
        </>
    )
}

export default AnalyticsPercent
