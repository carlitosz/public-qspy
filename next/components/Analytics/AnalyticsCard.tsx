import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'
import MinusCircleIcon from '@heroicons/react/24/outline/MinusCircleIcon'

interface AnalyticsCardProps {
    analytic: number | string
    data?: {
        now: number
        before: number
    }
    meta: string
    title: string
}

const AnalyticsCard = ({ analytic, data, meta, title }: AnalyticsCardProps): JSX.Element => {
    const change: number | undefined = data && ((data.now - data.before) / data.before) * 100

    return (
        <div className="card">
            <p className="text-sm text-dark font-medium antialiased">{title}</p>
            <p className="text-primary text-4xl my-5">{analytic.toLocaleString()}</p>
            <div className="flex items-center text-sm">
                {typeof change === 'number' && change === 0 && (
                    <>
                        <MinusCircleIcon className="analytics-icon-sm text-light" />
                        <span className="text-light mr-2">0%</span>
                    </>
                )}
                {typeof change === 'number' && change > 0 && (
                    <>
                        <ArrowLongUpIcon className="analytics-icon-sm text-red-500" />
                        <span className="text-red-600 mr-2">{change.toFixed(2)}%</span>
                    </>
                )}
                {typeof change === 'number' && change < 0 && (
                    <>
                        <ArrowLongDownIcon className="analytics-icon-sm text-emerald-500" />
                        <span className="text-emerald-600 mr-2">{change.toFixed(2)}%</span>
                    </>
                )}
                <span className="text-sm text-dark antialiased">{meta}</span>
            </div>
        </div>
    )
}

export default AnalyticsCard
