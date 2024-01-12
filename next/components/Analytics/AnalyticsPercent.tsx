import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'

interface AnalyticsPercentProps {
    percent: number
    color?: 'danger' | 'success' | 'neutral'
}

const AnalyticsPercent = ({ percent, color }: AnalyticsPercentProps): JSX.Element => {
    return (
        <>
            {percent === 0 && (
                <div aria-label="Zero percent change" className={`pill solid ${color ?? 'neutral'}`} role="status">
                    <span className="text-xs font-semibold antialised">0%</span>
                </div>
            )}
            {percent > 0 && (
                <div
                    aria-label={`${percent} percent change`}
                    className={`pill solid ${color ?? 'danger'}`}
                    role="status"
                >
                    <ArrowLongUpIcon className="analytics-icon-xs" />
                    <span className="text-xs font-semibold antialiased">{Math.abs(percent).toFixed(0)}%</span>
                </div>
            )}
            {percent < 0 && (
                <div
                    aria-label={`${percent} percent change`}
                    className={`pill solid ${color ?? 'success'}`}
                    role="status"
                >
                    <ArrowLongDownIcon className="analytics-icon-xs" />
                    <span className="text-xs font-semibold antialiased">{Math.abs(percent).toFixed(0)}%</span>
                </div>
            )}
        </>
    )
}

export default AnalyticsPercent
