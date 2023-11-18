import React from 'react'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import AnalyticsCardSkeleton from '@/components/Analytics/AnalyticsCardSkeleton'
import { calculatePercentChange, getExpiredEvents, getNewEvents } from '@/util/data'

import type { DomainEvent, GetEventsResponse } from 'types'

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

    // Secondary metrics, today vs yesterday.
    const totals: number = calculatePercentChange(todaysData.Total, yesterdaysData.Total)

    // What events expired? (in the queue today, but not yesterday)
    const expiredEvents: DomainEvent[] | [] = getExpiredEvents(todaysData.Data, yesterdaysData.Data)

    // What events are new? (not in the queue yesterday)
    const newEvents: DomainEvent[] | [] = getNewEvents(todaysData.Data, yesterdaysData.Data)

    const sumEvents = (events: DomainEvent[] | []): number => {
        return events.reduce((sum, event: DomainEvent) => sum + event.count, 0)
    }

    return (
        <div className="columns-4 h-full">
            <AnalyticsCard
                primaryMetric={todaysData.Total}
                secondaryMetric={totals}
                secondaryMetricColor={totals > 0 ? 'text-danger' : 'text-success'}
                secondaryMetricType="percent"
                subtext={`from ${yesterdaysData.Total} yesterday`}
                title="Messages currently in queue"
            />
            <AnalyticsCard
                primaryMetric={expiredEvents.length}
                subtext="Messages no longer in the queue"
                title="Expired Messages"
            />
            <AnalyticsCard
                primaryMetric={1092}
                secondaryMetric={5}
                secondaryMetricColor="text-danger"
                secondaryMetricType="percent"
                subtext={`from ${562} the previous week`}
                title="Expired Events"
            />
            <AnalyticsCard
                primaryMetric={newEvents.length}
                secondaryMetric={undefined}
                subtext={`There are ${sumEvents(newEvents)} that showed up today`}
                title="New events"
            />
        </div>
    )
}

export default AnalyticsContainer
