import React from 'react'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import AnalyticsCardSkeleton from '@/components/Analytics/AnalyticsCardSkeleton'
import { calculatePercentChange, getExpiredMessageCount, getNewMessageCount } from '@/helpers/domain-event-helper'

import type { GetEventsResponse } from 'types'

interface AnalyticsContainerProps {
    data: {
        todayMockData: GetEventsResponse | undefined
        yesterdayMockData: GetEventsResponse | undefined
    }
}

const AnalyticsContainer = ({ data }: AnalyticsContainerProps): JSX.Element => {
    const { todayMockData, yesterdayMockData } = data

    if (todayMockData.isValidating || yesterdayMockData.isValidating) {
        return (
            <div className="flex h-full gap-x-6">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
        )
    }

    // How many messages expired since yesterdayMockData?
    const expiredMessagesCount: number = getExpiredMessageCount(todayMockData.Data, yesterdayMockData.Data)

    // How many new events have entered the queue since yesterdayMockData?
    const newMessagesCount: number = getNewMessageCount(todayMockData.Data, yesterdayMockData.Data)

    return (
        <div className="flex h-full gap-x-6">
            <AnalyticsCard
                metric={todayMockData.Total}
                percentOfChange={calculatePercentChange(yesterdayMockData.Total, todayMockData.Total)}
                title="Total messages"
            />
            <AnalyticsCard metric={newMessagesCount} title="New" />
            <AnalyticsCard metric={expiredMessagesCount} title="Expired" />
            <AnalyticsCard
                metric={todayMockData.Data.length}
                percentOfChange={calculatePercentChange(yesterdayMockData.Data.length, todayMockData.Data.length)}
                title="Unique messages"
            />
        </div>
    )
}

export default AnalyticsContainer
