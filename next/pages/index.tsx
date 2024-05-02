import React from 'react'
import { format } from 'date-fns'
import { subDays } from 'date-fns'

import Alert from '@/components/Alert/Alert'
import AnalyticsContainer from '@/components/Analytics/AnalyticsContainer'
import Page from '@/components/Page/Page'
import TableContainer from '@/components/Table/TableContainer'
import { getErrorMessage, axios } from '@/utils/axios'

import type { NextPage } from 'next'
import type { GetEventsResponse } from 'types'

interface MockData {
    todayMockData: GetEventsResponse
    yesterdayMockData: GetEventsResponse
}

const QUEUE_NAME = 'domain-events-carlos-zaragoza-deadletter'
const DATE_TODAY = format(new Date(), 'yyyy-MM-dd')
const DATE_YESTERDAY = format(subDays(new Date(), 1), 'yyyy-MM-dd')

const Home: NextPage = ({ todayMockData, yesterdayMockData }: MockData): JSX.Element => {
    if (todayMockData.error) {
        const { code, message } = getErrorMessage(todayMockData.error)

        return (
            <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
                <Alert message={`${code} ${message}`} title="An error has occurred" type="danger" />
            </Page>
        )
    }

    if (yesterdayMockData.error) {
        const { code, message } = getErrorMessage(yesterdayMockData.error)

        return (
            <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
                <Alert message={`${code} ${message}`} title="An error has occurred" type="danger" />
            </Page>
        )
    }

    return (
        <Page title={QUEUE_NAME} heading={QUEUE_NAME}>
            <div className="w-full rounded-md h-auto">
                <AnalyticsContainer data={{ todayMockData, yesterdayMockData }} />
            </div>
            <div className="w-full h-fit py-8">
                <TableContainer data={{ todayMockData, yesterdayMockData }} />
            </div>
        </Page>
    )
}

export async function getStaticProps() {
    var today = null
    var yesterday = null

    try {
        today = await axios.get(
            `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent(DATE_TODAY)}`
        )
    } catch (e) {
        console.error(`Failed to fetch today's data: ${JSON.stringify(e)}`)
        return {
            props: {
                today: {
                    error: true
                },
                yesterday: {}
            }
        }
    }

    try {
        yesterday = await axios.get(
            `/events?queue=${encodeURIComponent(QUEUE_NAME)}&date=${encodeURIComponent(DATE_YESTERDAY)}`
        )
    } catch (e) {
        console.error(`Failed to fetch yesterady's data: ${JSON.stringify(e)}`)
        return {
            props: {
                today: {},
                yesterday: {
                    error: true
                }
            }
        }
    }

    return {
        props: {
            todayMockData: {
                ...today.data,
                isValidating: false
            },
            yesterdayMockData: {
                ...yesterday.data,
                isValidating: false
            }
        }
    }
}

export default Home
