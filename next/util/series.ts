import type { DomainEvent } from 'types'
import type { ApexOptions } from 'apexcharts'

export declare type SeriesMeta = { path: string; firstSeen: string; lastSeen: string }
export declare type SeriesDataPoint = { x: string; y: number; meta: SeriesMeta }

/**
 * Creates an array of SeriesDataPoint
 *
 * @param data An array of domain events
 * @param name The name of the series
 *
 * @returns ApexOptions['series']
 */
export const createSeries = (data: DomainEvent[], name: string): ApexOptions['series'] => {
    return [
        {
            name,
            data: data.map((d: DomainEvent): SeriesDataPoint => {
                var split = d.event.split('\\')
                const name: string = split.pop() ?? ''

                return {
                    x: name,
                    y: d.count,
                    meta: {
                        path: split.join('\\'),
                        firstSeen: d.fs,
                        lastSeen: d.ls
                    }
                }
            })
        }
    ]
}
