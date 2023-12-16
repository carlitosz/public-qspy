import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/solid/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/solid/ArrowLongUpIcon'

interface AnalyticsNumberProps {
    number: number
    color?: 'danger' | 'success' | 'neutral'
}

const AnalyticsNumber = ({ number, color }: AnalyticsNumberProps): JSX.Element => {
    return (
        <>
            {number === 0 && (
                <div className={`pill ${color ?? 'neutral solid'}`}>
                    <span className="text-xs font-semibold antialised">0</span>
                </div>
            )}
            {number > 0 && (
                <div className={`pill ${color ?? 'danger solid'}`}>
                    <ArrowLongUpIcon className="analytics-icon-xs" />
                    <span className="text-xs font-semibold antialiased">{Math.abs(number)}</span>
                </div>
            )}
            {number < 0 && (
                <div className={`pill ${color ?? 'success solid'}`}>
                    <ArrowLongDownIcon className="analytics-icon-xs" />
                    <span className="text-success text-xs font-semibold antialiased">{Math.abs(number)}</span>
                </div>
            )}
        </>
    )
}

export default AnalyticsNumber
