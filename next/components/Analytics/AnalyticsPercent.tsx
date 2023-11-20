import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'
import MinusSmallIcon from '@heroicons/react/24/outline/MinusSmallIcon'

interface AnalyticsPercentProps {
    percent: number
    color?: 'danger' | 'success' | 'neutral' | undefined
}

const AnalyticsPercent = ({ percent, color }: AnalyticsPercentProps): JSX.Element => {
    return (
        <>
            {percent === 0 && (
                <div className={`pill ${color ?? 'neutral'}`}>
                    <MinusSmallIcon className="analytics-icon-xs" />
                    <span className="p-1">0%</span>
                </div>
            )}
            {percent > 0 && (
                <div className={`pill ${color ?? 'danger'}`}>
                    <ArrowLongUpIcon className="analytics-icon-xs" />
                    <span className="p-1">{Math.abs(percent).toFixed(0)}%</span>
                </div>
            )}
            {percent < 0 && (
                <div className={`pill ${color ?? 'success'}`}>
                    <ArrowLongDownIcon className="analytics-icon-xs" />
                    <span className="p-1">{Math.abs(percent).toFixed(0)}%</span>
                </div>
            )}
        </>
    )
}

export default AnalyticsPercent
