import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/solid/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/solid/ArrowLongUpIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'

interface AnalyticsNumberProps {
    className?: 'table-change'
    number: number
    color?: 'danger' | 'success' | 'neutral'
    style?: 'solid' | 'outline' | 'none'
}

const AnalyticsNumber = ({ className, color, number, style }: AnalyticsNumberProps): JSX.Element => {
    return (
        <>
            {number === 0 && (
                <div className={`pill ${color ?? 'neutral'} ${style} ${className}`}>
                    <ArrowsRightLeftIcon className="analytics-icon-xs" />
                    <span className="text-sm font-semibold antialised">0</span>
                </div>
            )}
            {number > 0 && (
                <div className={`pill ${color ?? 'danger'} ${style} ${className}`}>
                    <ArrowLongUpIcon className="analytics-icon-xs" />
                    <span className="text-sm font-semibold antialiased">{Math.abs(number)}</span>
                </div>
            )}
            {number < 0 && (
                <div className={`pill ${color ?? 'success'} ${style} ${className}`}>
                    <ArrowLongDownIcon className="analytics-icon-xs" />
                    <span className="text-success text-sm font-semibold antialiased">{Math.abs(number)}</span>
                </div>
            )}
        </>
    )
}

export default AnalyticsNumber
