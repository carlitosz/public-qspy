export interface DomainEvent {
    event: string
    count: number
}

export interface GetEventsResponse {
    data: DomainEvent[] | []
    message: string
}
