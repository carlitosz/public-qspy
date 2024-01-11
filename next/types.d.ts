import type { Return } from '@/util/axios'

// What is returned from the server
export interface DomainEvent {
    event: string
    count: number
    fs: string
    ls: string
}

// We calculate this diff on the client
declare type DomainEventDiff = {
    diff: {
        change: number
        eventsYesterday: number
    }
}

declare type DailyChange = {
    change: number
}

// What is used to plot data points
export type DomainEventSeriesData = DomainEvent & DomainEventDiff
export type DomainEventTableData = DomainEvent & DailyChange

// Server response via Axios
export type GetEventsResponse = Return<{
    Data: DomainEvent[] | []
    Date: string
    Message: string
    Total: number
}>

// Chart orientation
export type Orientation = 'horizontal' | 'vertical'

// Sort direction
export type SortDirection = 'ASC' | 'DESC'
