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

export const sort = (data: DomainEvent[] | [], direction: Direction): DomainEvent[] | [] => {
    return data.sort((a: DomainEvent, b: DomainEvent) => {
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