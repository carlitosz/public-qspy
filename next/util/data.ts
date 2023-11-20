import { DomainEvent, DomainEventSeriesData } from 'types'

/**
 * Calculates the % change in yesterday vs today.
 *
 * @param today         Number of events today
 * @param yesterday     Number of events yesterday
 *
 * @returns             Percent change (+/-) or undefined
 */
export const calculatePercentChange = (today: number, yesterday: number): number => {
    return ((today - yesterday) / yesterday) * 100
}

/**
 *
 */
export const getNewMessageCount = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): number => {
    const events: DomainEvent[] | [] = today.filter(
        (t: DomainEvent) => !yesterday.some((y: DomainEvent) => t.event === y.event)
    )

    return events.reduce((sum, event: DomainEvent) => sum + event.count, 0)
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
    const events: DomainEvent[] | [] = yesterday.filter(
        (y: DomainEvent) => !today.some((t: DomainEvent) => t.event === y.event)
    )

    return events.reduce((sum, event: DomainEvent) => sum + event.count, 0)
}

/**
 * Compares today's data with yesterday's data and calculate's a difference in
 * events. The end result is a union between DomainEvent & DomainEventDiff
 * called DomainEventSeriesData.
 *
 * Returns an array of DomainEventSeriesData plot data.
 *
 * @param today     Today's data of DomainEvent[]
 * @param yesterday Yesterday's data of DomainEvent[]
 *
 * @returns         An array of DomainEventSeriesData ready for plotting
 */
export const createSeriesData = (today: DomainEvent[] | [], yesterday: DomainEvent[] | []): DomainEventSeriesData[] => {
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
export const paginate = (data: DomainEvent[] | [], perChunk: number = 20): [DomainEvent[]] | [[]] => {
    let chunks: [DomainEvent[]] = [[]]
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
