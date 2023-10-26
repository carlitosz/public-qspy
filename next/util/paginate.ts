import { DomainEvent } from 'types'

export const paginate = (data: DomainEvent[] | [], perChunk: number): [DomainEvent[]] | [[]] => {
    let chunks: [DomainEvent[]] = [[]]
    chunks.shift()

    for (let i: number = 0; i < data.length; i += perChunk) {
        chunks.push(data.slice(i, i + perChunk))
    }

    return chunks
}

type Direction = 'ASC' | 'DESC'

export const sort = (
    data: DomainEvent[] | [],
    direction: Direction,
    property: keyof DomainEvent
): DomainEvent[] | [] => {
    return data.sort((a: DomainEvent, b: DomainEvent) => {
        if (typeof a[property] === 'string') {
            return direction === 'ASC' ? b.event.localeCompare(a.event) : a.event.localeCompare(b.event)
        }

        return direction === 'ASC' ? a.count - b.count : b.count - a.count
    })
}

type FormattedJSONData = {
    [key: DomainEvent['event']]: DomainEvent['count']
}

export const formattedJSONArray = (data: DomainEvent[]): string => {
    const obj: FormattedJSONData = {}

    data.forEach(({ event, count }: DomainEvent) => (obj[event] = count))

    return JSON.stringify(obj, undefined, 2)
}
