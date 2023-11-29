import React from 'react'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import AnalyticsCardSkeleton from '@/components/Analytics/AnalyticsCardSkeleton'
import { calculatePercentChange, getExpiredMessageCount, getNewMessageCount } from '@/util/data'

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
            <div className="flex h-full gap-x-6">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
        )
    }

    const todaysData: GetEventsResponse = today.data
    const yesterdaysData: GetEventsResponse = yesterday.data

    // How many messages expired since yesterday?
    const expiredMessagesCount: number = getExpiredMessageCount(todaysData.Data, yesterdaysData.Data)

    // How many new events have entered the queue since yesterday?
    const newMessagesCount: number = getNewMessageCount(todaysData.Data, yesterdaysData.Data)

    return (
        <div className="flex h-full gap-x-6">
            <AnalyticsCard
                difference={{
                    metric: calculatePercentChange(yesterdaysData.Total, todaysData.Total),
                    type: 'percent'
                }}
                metric={todaysData.Total}
                title="Total Messages"
            />
            <AnalyticsCard metric={newMessagesCount} title="New messages" />
            <AnalyticsCard metric={expiredMessagesCount} title="Expired messages" />
            <AnalyticsCard
                difference={{
                    metric: calculatePercentChange(yesterdaysData.Data.length, todaysData.Data.length),
                    type: 'percent'
                }}
                metric={todaysData.Data.length}
                title="Unique events"
            />
            <AnalyticsCard metric={1092} title="Expired events" />
        </div>
    )
}

export default AnalyticsContainer
