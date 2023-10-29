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
        <div className={`flex flex-col border border-neutral-200 rounded-xl bg-neutral-50 font-medium antialiased p-6`}>
            <p className="text-neutral-500 text-sm">{title}</p>
            <p className="text-indigo-500 text-3xl my-4">{analytic.toLocaleString()}</p>
            <div className="flex justify-start">
                {change !== undefined && (
                    <div className="flex items-end mr-2">
                        {change === 0 && (
                            <>
                                <MinusCircleIcon className="h-5 w-5 text-neutral-500 mr-1" />
                                <span className="text-sm text-neutral-600">0%</span>
                            </>
                        )}
                        {change > 0 && (
                            <>
                                <ArrowLongUpIcon className="h-5 w-5 text-red-500 mr-1" />
                                <span className="text-sm text-red-600">{change.toFixed(2)}%</span>
                            </>
                        )}
                        {change < 0 && (
                            <>
                                <ArrowLongDownIcon className="h-5 w-5 text-emerald-500 mr-1" />
                                <span className="text-sm text-emerald-600">{change.toFixed(2)}%</span>
                            </>
                        )}
                    </div>
                )}
                <div className="flex items-end">
                    <span className="text-neutral-400 text-sm">{meta}</span>
                </div>
            </div>
        </div>
    )
}

export default AnalyticsCard
