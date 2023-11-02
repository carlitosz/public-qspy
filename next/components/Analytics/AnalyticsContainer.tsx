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
            <>
                <AnalyticsCardSkeleton border="border-l border-y" borderRadius="rounded-l-xl" />
                <AnalyticsCardSkeleton border="border-y border-r" />
                <AnalyticsCardSkeleton border="border-y border-r" />
                <AnalyticsCardSkeleton border="border-y border-r" borderRadius="rounded-r-xl" />
            </>
        )
    }

    return (
        <>
            <AnalyticsCard
                analytic={todaysData.Total}
                border="border"
                borderRadius="rounded-l-xl"
                data={{ now: todaysData.Total, before: yesterdaysData.Total }}
                meta={`from ${yesterdaysData.Total} yesterday`}
                title="Messages in queue today"
            />
            <AnalyticsCard
                analytic={1092}
                border="border-y border-r"
                data={{ now: 1092, before: 956 }}
                meta={`from ${562} the previous week`}
                title="Messages in queue past week"
            />
            <AnalyticsCard
                analytic={todaysData.Date}
                border="border-y border-r"
                meta={todaysData.Message}
                title="Invocation Date & Status"
            />
            <AnalyticsCard
                analytic={todaysData.Date}
                border="border-y border-r"
                borderRadius="rounded-r-xl"
                meta={todaysData.Message}
                title="Invocation Date & Status"
            />
        </>
    )
}

export default AnalyticsContainer
