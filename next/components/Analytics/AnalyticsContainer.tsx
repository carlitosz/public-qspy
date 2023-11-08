import React from 'react'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import AnalyticsCardSkeleton from '@/components/Analytics/AnalyticsCardSkeleton'

import type { GetEventsResponse } from 'types'

interface AnalyticsContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
}

const AnalyticsContainer = ({ data }: AnalyticsContainerProps): JSX.Element => {
    const { today, yesterday } = data

    if (today.error || yesterday.error) {
        return <>Error occurred.</>
    }

    if (today.isValidating || yesterday.isValidating || !today || !yesterday) {
        return (
            <div className="columns-4 h-full">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
        )
    }

    const todaysData: GetEventsResponse = today.data
    const yesterdaysData: GetEventsResponse = yesterday.data

    return (
        <div className="columns-4 h-full">
            <AnalyticsCard
                analytic={todaysData.Total}
                data={{ today: todaysData.Total, yesterday: yesterdaysData.Total }}
                meta={`from ${yesterdaysData.Total} yesterday`}
                title="Today"
            />
            <AnalyticsCard
                analytic={1092}
                data={{ today: 1092, yesterday: 956 }}
                meta={`from ${562} the previous week`}
                title="Past week"
            />
            <AnalyticsCard analytic={todaysData.Date} meta={todaysData.Message} title="Date & Status" />
            <AnalyticsCard analytic={todaysData.Date} meta={todaysData.Message} title="Invocation Date & Status" />
        </div>
    )
}

export default AnalyticsContainer
