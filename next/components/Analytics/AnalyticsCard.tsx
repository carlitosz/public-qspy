import React from 'react'
import AnalyticsMeta from '@/components/Analytics/AnalyticsMeta'

interface AnalyticsCardProps {
    analytic: number | string
    data?: {
        today: number
        yesterday: number
    }
    meta: string
    title: string
}

const AnalyticsCard = ({ analytic, data, meta, title }: AnalyticsCardProps): JSX.Element => {
    const change: number | undefined = data && ((data.today - data.yesterday) / data.yesterday) * 100

    return (
        <div className="card">
            <p className="text-md text-dark antialiased">{title}</p>
            <p className="text-primary font-medium text-4xl my-5 antialiased">{analytic.toLocaleString()}</p>
            <AnalyticsMeta change={change} message={meta} size="text-sm" />
        </div>
    )
}

export default AnalyticsCard
