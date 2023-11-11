import React from 'react'
import MinusSmallIcon from '@heroicons/react/24/outline/MinusSmallIcon'
import PlusSmallIcon from '@heroicons/react/24/outline/PlusSmallIcon'

interface AnalyticsMetaProps {
    change: number | undefined
    message: string
    size: 'text-xs' | 'text-sm'
}

const AnalyticsMeta = ({ change, message, size = 'text-sm' }: AnalyticsMetaProps): JSX.Element => {
    return (
        <div className="flex items-center justify-start">
            {typeof change === 'number' && change === 0 && (
                <>
                    <span className={`${size} text-text mr-1`}>0%</span>
                </>
            )}
            {typeof change === 'number' && change > 0 && (
                <>
                    <PlusSmallIcon className="analytics-icon-xs text-red-600" />
                    <span className={`${size} font-medium text-red-600 mr-1`}>{change.toFixed(0)}%</span>
                </>
            )}
            {typeof change === 'number' && change < 0 && (
                <>
                    <MinusSmallIcon className="analytics-icon-xs text-emerald-600" />
                    <span className={`${size} text-emerald-600 mr-1`}>{change.toFixed(0)}%</span>
                </>
            )}
            <span className={`${size} text-title antialiased`}>{message}</span>
        </div>
    )
}

export default AnalyticsMeta
