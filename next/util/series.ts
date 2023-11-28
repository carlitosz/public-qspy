import type { DomainEventSeriesData, DomainEventDiff } from 'types'
import type { ApexOptions } from 'apexcharts'

export declare type SeriesMeta = { path: string; firstSeen: string; lastSeen: string } & DomainEventDiff
export declare type SeriesDataPoint = { x: string; y: number; meta: SeriesMeta }

/**
 * Creates an array of SeriesDataPoint
 *
 * @param data      An array of domain events
 * @param name      The name of the series
 * @param results   The number of results to display per page. This is used to "fill" in the series with
 *                  blank data points when the data points are < resultsPerPage.
 *
 * @returns ApexOptions['series']
 */
export const createSeries = (data: DomainEventSeriesData[], name: string, results: number): ApexOptions['series'] => {
    let series: SeriesDataPoint[] = data.map((d: DomainEventSeriesData): SeriesDataPoint => {
        var split = d.event.split('\\')
        const name: string = split.pop() ?? ''

        return {
            x: name,
            y: d.count,
            meta: {
                path: split.join('\\'),
                firstSeen: d.fs,
                lastSeen: d.ls,
                diff: d.diff
            }
        }
    })

    // Fill in the series up to 'results' with blank data points
    if (series.length < results && series.length > 0) {
        for (let i = results - series.length; i > 0; i--) {
            series.push({
                x: '',
                y: 0,
                meta: {
                    path: '',
                    firstSeen: '',
                    lastSeen: '',
                    diff: {
                        change: 0,
                        eventsYesterday: 0
                    }
                }
            })
        }
    }

    return [
        {
            name,
            data: series
        }
    ]
}
