import type { DomainEvent, DomainEventTableData, SortDirection } from 'types'
import {
    calculatePercentChange,
    getNewMessageCount,
    getExpiredMessageCount,
    createTableData,
    paginate,
    search,
    sortBy
} from '@/helpers/domain-event-helper'

describe('domain-event-helper', () => {
    test.each([{ from: 50, to: 100, expected: 100 }])('it calculates percent change', ({ from, to, expected }) => {
        expect(calculatePercentChange(from, to)).toBe(expected)
    })

    test.each([
        { today: [], yesterday: [], expected: 0 },
        {
            today: [{ event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }],
            yesterday: [{ event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }],
            expected: 0
        },
        {
            today: [{ event: 'New', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }],
            yesterday: [{ event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }],
            expected: 1
        },
        {
            today: [
                { event: 'New', count: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ],
            yesterday: [{ event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }],
            expected: 5
        }
    ])('it returns new domain events', ({ today, yesterday, expected }) => {
        expect(getNewMessageCount(today, yesterday)).toBe(expected)
    })

    test.each([
        { today: [], yesterday: [], expected: 0 },
        {
            // Same data on consecutive days
            today: [{ event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }] as DomainEvent[],
            yesterday: [
                { event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            expected: 0
        },
        {
            // 'Name' expired since yesterday
            today: [{ event: 'New', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }] as DomainEvent[],
            yesterday: [
                { event: 'Name', count: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            expected: 1
        },
        {
            // 6 events expired (3 of each)
            today: [
                { event: 'New', count: 2, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 2, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            yesterday: [
                { event: 'New', count: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            expected: 6
        }
    ])('it returns new domain events', ({ today, yesterday, expected }) => {
        expect(getExpiredMessageCount(today, yesterday)).toBe(expected)
    })

    test.each([
        {
            today: [
                { event: 'New', count: 2, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 2, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            yesterday: [
                { event: 'New', count: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEvent[],
            expected: [
                { event: 'New', count: 2, change: -3, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Name', count: 2, change: -3, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[]
        }
    ])('creates DomainEventTableData', ({ today, yesterday, expected }) => {
        expect(createTableData(today, yesterday)).toStrictEqual(expected)
    })

    test.each([
        {
            data: [],
            perChunk: 20,
            expectedPages: 1 // Empty page
        },
        {
            data: [
                { event: 'One', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Two', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Three', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Four', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Five', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Six', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Seven', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Eight', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Nine', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Ten', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            perChunk: 2,
            expectedPages: 5
        },
        {
            data: [
                { event: 'One', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Two', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Three', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Four', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Five', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Six', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'Seven', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            perChunk: 2,
            expectedPages: 4
        }
    ])('it paginates data', ({ data, perChunk, expectedPages }) => {
        const paginated = paginate(data, perChunk)

        expect(paginated.length).toEqual(expectedPages)
    })

    test.each([
        {
            data: [
                { event: 'hello', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'hello1', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'hello2', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world2', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'research', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            searchString: 'hello',
            expectedResults: 3
        },
        {
            data: [
                { event: 'hello', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'hello1', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'hello2', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world2', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'research', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            searchString: 'square',
            expectedResults: 2
        },
        {
            data: [
                { event: 'hello2', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            searchString: 'unknown string',
            expectedResults: 0
        }
    ])('it returns search results', ({ data, searchString, expectedResults }) => {
        const result = search(data, searchString)

        expect(result.length).toBe(expectedResults)
    })

    test.each([
        {
            data: [
                { event: 'hello2', count: 12, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 8, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 39, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 3, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 1, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            sortKey: 'count' as keyof DomainEventTableData,
            direction: 'DESC' as SortDirection,
            firstElement: 39,
            lastElement: 2
        },
        {
            data: [
                { event: 'hello2', count: 12, change: 6, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 8, change: 4, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 39, change: 89, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 3, change: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 11, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            sortKey: 'event' as keyof DomainEventTableData,
            direction: 'ASC' as SortDirection,
            firstElement: 'world1',
            lastElement: 'article'
        },
        {
            data: [
                { event: 'hello2', count: 12, change: 6, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'world1', count: 8, change: 4, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'article', count: 39, change: 89, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'square', count: 3, change: 5, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' },
                { event: 'researchsquare', count: 2, change: 11, fs: '2024-01-01T00:00:00', ls: '2024-01-01T00:00:00' }
            ] as DomainEventTableData[],
            sortKey: 'change' as keyof DomainEventTableData,
            direction: 'DESC' as SortDirection,
            firstElement: 89,
            lastElement: 4
        }
    ])('it sorts data by key', ({ data, sortKey, direction, firstElement, lastElement }) => {
        const results = sortBy(data, sortKey, direction)

        expect(results.pop()[`${sortKey}`]).toBe(lastElement)
        expect(results.shift()[`${sortKey}`]).toBe(firstElement)
    })
})
