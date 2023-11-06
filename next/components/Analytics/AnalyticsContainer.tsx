import React from 'react'
import { subDays } from 'date-fns'
import { format } from 'date-fns-tz'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import AnalyticsCardSkeleton from '@/components/Analytics/AnalyticsCardSkeleton'

import { GetEventsResponse } from 'types'
import { useRequest } from '@/util/axios'

interface AnalyticsContainerProps {
    queueName: string
    todaysData: GetEventsResponse | undefined
}

const AnalyticsContainer = ({ todaysData, queueName }: AnalyticsContainerProps): JSX.Element => {
    const DATE = format(subDays(new Date(), 1), 'yyyy-MM-dd')

    const {
        isValidating,
        error,
        data: yesterdaysData
    } = useRequest<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent(queueName)}&date=${encodeURIComponent(DATE)}`,
            method: 'GET'
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    if (error) {
        return <>Error occurred.</>
    }

    if (isValidating || !yesterdaysData || !todaysData) {
        return (
            <div className="columns-4 h-full">
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
                <AnalyticsCardSkeleton />
            </div>
        )
    }

    return (
        <div className="columns-4 h-full">
            <AnalyticsCard
                analytic={todaysData.Total}
                data={{ now: todaysData.Total, before: yesterdaysData.Total }}
                meta={`from ${yesterdaysData.Total} yesterday`}
                title="Today"
            />
            <AnalyticsCard
                analytic={1092}
                data={{ now: 1092, before: 956 }}
                meta={`from ${562} the previous week`}
                title="Past week"
            />
            <AnalyticsCard analytic={todaysData.Date} meta={todaysData.Message} title="Invocation Date & Status" />
            <AnalyticsCard analytic={todaysData.Date} meta={todaysData.Message} title="Invocation Date & Status" />
        </div>
    )
}

export default AnalyticsContainer
