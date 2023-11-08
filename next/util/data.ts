import { DomainEvent, DomainEventSeriesData } from 'types'

/**
 * Sorts data in the provided direction and by a DomainEvent key.
 *
 * @param data      An array of DomainEvents
 * @param direction The direction to sort
 * @param property  The key to sort by
 *
 * @returns         A sorted array of DomainEvents
 */
export const sort = (
    data: DomainEvent[] | [],
    direction: 'ASC' | 'DESC',
    key: keyof DomainEvent
): DomainEvent[] | [] => {
    return data.sort((a: DomainEvent, b: DomainEvent) => {
        if (typeof a[key] === 'string') {
            return direction === 'ASC' ? b.event.localeCompare(a.event) : a.event.localeCompare(b.event)
        }

        return direction === 'ASC' ? a.count - b.count : b.count - a.count
    })
}

/**
 * Returns an array of DomainEventSeriesData plot data.
 *
 * @param today     Today's data of DomainEvent[]
 * @param yesterday Yesterday's data of DomainEvent[]
 *
 * @returns         An array of DomainEventSeriesData ready for plotting
 */
export const diff = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): DomainEventSeriesData[] => {
    return today.map((t: DomainEvent) => {
        const y: DomainEvent | undefined = yesterday.find((y: DomainEvent) => t.event === y.event)

        if (y) {
            return {
                ...t,
                diff: {
                    change: ((t.count - y.count) / y.count) * 100,
                    eventsYesterday: y.count
                }
            }
        }

        // This event did not occur yesterday. It's a new event.
        return {
            ...t,
            diff: {
                change: 100,
                eventsYesterday: 0
            }
        }
    })
}

/**
 * Poor man's pagination. Chunks data into an array of arrays.
 *
 * @param data      An array of DomainEvent data
 * @param perChunk  Number of elements per chunk
 *
 * @returns         An array of arrays of size perChunk
 */
export const paginate = (data: DomainEventSeriesData[] | [], perChunk: number): [DomainEventSeriesData[]] | [[]] => {
    let chunks: [DomainEventSeriesData[]] = [[]]
    chunks.shift()

    for (let i: number = 0; i < data.length; i += perChunk) {
        chunks.push(data.slice(i, i + perChunk))
    }

    return chunks
}

type FormattedJSONData = {
    [key: DomainEvent['event']]: DomainEvent['count']
}

/**
 * Returns a string of DomainEvent in JSON format for sharing.
 *
 * @param data An array of DomainEvent data
 *
 * @returns An json string of DomainEvent data
 */
export const formattedJSONArray = (data: DomainEvent[]): string => {
    const obj: FormattedJSONData = {}

    data.forEach(({ event, count }: DomainEvent) => (obj[event] = count))

    return JSON.stringify(obj, undefined, 2)
}
