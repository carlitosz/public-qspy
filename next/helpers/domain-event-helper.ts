import { SortDirection } from '@/components/Table/TableHeaders'
import { DomainEvent, DomainEventTableData } from 'types'

/**
 * Calculates the % change from yesterday to today.
 *
 * @param today         Number of events today
 * @param yesterday     Number of events yesterday
 *
 * @returns             Percent change (+/-)
 */
export const calculatePercentChange = (from: number, to: number): number => {
    if (from === 0) {
        return 0
    }

    return ((to - from) / Math.abs(from)) * 100
}

/**
 * Returns the number of new messages by comparing yesterday's data with today's data.
 *
 * @param today     Today's data of DomainEvent[]
 * @param yesterday Yesterday's data of DomainEvent[]
 */
export const getNewMessageCount = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): number => {
    let newMessages = 0

    today.forEach((t: DomainEvent) => {
        const y: DomainEvent | undefined = yesterday.find((y: DomainEvent) => t.event === y.event)

        if (y) {
            newMessages += t.count > y.count ? t.count - y.count : 0
        } else {
            newMessages += t.count
        }
    })

    return newMessages
}

/**
 * Finds expired events by comparing yesterday/today, then sums up the number of events
 * that have expired and returns the total.
 *
 * @param today     Today's data of DomainEvent[]
 * @param yesterday Yesterday's data of DomainEvent[]
 *
 * @returns         Total sum of count of expired events
 */
export const getExpiredMessageCount = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): number => {
    let expired = 0

    yesterday.forEach((y: DomainEvent) => {
        const t: DomainEvent | undefined = today.find((t: DomainEvent) => y.event === t.event)

        if (t) {
            expired += t.count < y.count ? y.count - t.count : 0
        } else {
            expired += y.count
        }
    })

    return expired
}

/**
 * Compares yesterday vs. today counts and attaches the 'change' property to each DomainEvent.
 */
export const createTableData = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): DomainEventTableData[] => {
    return today.map((t: DomainEvent) => {
        const y: DomainEvent | undefined = yesterday.find((y: DomainEvent) => t.event === y.event)

        if (y) {
            return y.count === t.count ? { ...t, change: 0 } : { ...t, change: t.count - y.count }
        }

        return {
            ...t,
            change: t.count
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
export const paginate = (data: DomainEventTableData[] | [], perChunk: number = 20): [DomainEventTableData[]] | [[]] => {
    if (data.length === 0) {
        return [[]]
    }

    let chunks: [DomainEventTableData[]] = [[]]
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

/**
 * Searches domain event data (event property) for matches.
 *
 * @param data          An array of DomainEvent data
 * @param searchString  The search string
 *
 * @returns An array of DomainEvent search results or empty
 */
export const search = (data: DomainEventTableData[], searchString: string): DomainEventTableData[] | [] => {
    return data.filter((value: DomainEventTableData) =>
        value.event.toLowerCase().includes(searchString.toLowerCase().trim().replaceAll(' ', ''))
    )
}

/**
 * Sorts by a given sortKey and sort direction.
 *
 * @param data      An array of DomainEvent data
 * @param sortKey   The key to sort by
 * @param direction The direction to sort by
 *
 * @returns An array of sorted DomainEventTableData
 */
export const sortBy = (
    data: DomainEventTableData[] | [],
    sortKey: keyof DomainEventTableData,
    direction: SortDirection
): DomainEventTableData[] | [] => {
    if (data.length === 0) {
        return []
    }

    return data.sort((a: DomainEventTableData, b: DomainEventTableData): number => {
        if (typeof a[sortKey] === 'string' && typeof b[sortKey] === 'string') {
            let aval = a[sortKey] as string
            let bval = b[sortKey] as string

            return direction === 'ASC' ? bval.localeCompare(aval) : aval.localeCompare(bval)
        }

        let aval = a[sortKey] as number
        let bval = b[sortKey] as number

        return direction === 'ASC' ? aval - bval : bval - aval
    })
}
