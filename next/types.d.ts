import type { Return } from '@/utils/application/axios'

// What is returned from the server
export interface DomainEvent {
    event: string
    count: number
    fs: string
    ls: string
}

declare type DailyChange = {
    change: number
}

export type DomainEventTableData = DomainEvent & DailyChange

// Server response via Axios
export type GetEventsResponse = Return<{
    Data: DomainEvent[] | []
    Date: string
    Message: string
    Total: number
}>

// Sort direction
export type SortDirection = 'ASC' | 'DESC'
