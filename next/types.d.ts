export interface DomainEvent {
    event: string
    count: number
}

export interface GetEventsResponse {
    Data: DomainEvent[] | []
    Date: string
    Message: string
}

export type Orientation = 'horizontal' | 'vertical'

export type SortDirection = 'ASC' | 'DESC'
