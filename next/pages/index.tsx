import React from 'react'

import type { NextPage } from 'next'

import Chart from '@/components/ApexChart/Chart'
import ChartSkeleton from '@/components/ApexChart/ChartSkeleton'
import { request } from '@/util/axios'

import type { GetEventsResponse } from 'types'

interface HomePageProps {}

const Home: NextPage<HomePageProps> = ({}: HomePageProps) => {
    const { isValidating, error, data } = request<GetEventsResponse>(
        {
            url: `/events?queue=${encodeURIComponent('domain-events-carlos-zaragoza-deadletter')}`,
            method: 'GET'
        },
        {
            revalidateOnFocus: false,
            shouldRetryOnError: false
        }
    )

    if (isValidating) {
        return <div className="flex flex-col bg-white rounded mt-4">{<ChartSkeleton />}</div>
    }

    if (error) {
        return <div className="flex flex-col bg-white rounded mt-4">An error has occured</div>
    }

    if (!data) {
        return <div className="flex flex-col bg-white rounded mt-4">No data returned</div>
    }

    return (
        <div className="main-content flex flex-col flex-grow p-6">
            <h1 className="font-bold text-2xl text-indigo-700">Dashboard</h1>
            <div className="flex flex-col bg-white rounded mt-4">
                <Chart data={data.data} breakLabels={true} type="bar" />
            </div>
        </div>
    )
}

export default Home
