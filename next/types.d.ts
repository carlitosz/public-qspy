export interface DomainEvent {
    event: string
    count: number
    fs: string
    ls: string
}

export interface GetEventsResponse {
    Data: DomainEvent[] | []
    Date: string
    Message: string
    Total: number
}

export type Orientation = 'horizontal' | 'vertical'

export type SortDirection = 'ASC' | 'DESC'
