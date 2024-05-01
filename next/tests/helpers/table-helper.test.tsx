import React from 'react'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import { tableAriaSort, tableHeaderArrows, tablePillColor, tablePillIcon } from '@/helpers/table-helper'

import type { TableHeaderProps } from '@/helpers/table-helper'

describe('table-helper ', () => {
    test.each([
        { change: 0, expected: 'neutral' },
        { change: 1, expected: 'danger' },
        { change: -1, expected: 'success' }
    ])('returns the pill color', ({ change, expected }) => {
        expect(tablePillColor(change)).toBe(expected)
    })

    test.each([
        { change: 0, expected: <ArrowsRightLeftIcon className="analytics-icon-xs" /> },
        { change: 1, expected: <ArrowLongUpIcon className="analytics-icon-xs" /> },
        { change: -1, expected: <ArrowLongDownIcon className="analytics-icon-xs" /> }
    ])('returns the pill icon', ({ change, expected }) => {
        expect(JSON.stringify(tablePillIcon(change))).toStrictEqual(JSON.stringify(expected))
    })

    test.each([
        {
            // Ascending by event
            selectedSortKey: 'event',
            sortKey: 'event',
            direction: 'ASC',
            expected: <ChevronDownIcon aria-label="chevron-down-icon" className="icon-xs ml-1 [&>path]:stroke-[2]" />
        },
        {
            // Descending by event
            selectedSortKey: 'event',
            sortKey: 'event',
            direction: 'DESC',
            expected: <ChevronUpIcon aria-label="chevron-up-icon" className="icon-xs ml-1 [&>path]:stroke-[2]" />
        },
        {
            // Invisible if not sorting by the selectedSortKey
            selectedSortKey: 'change',
            sortKey: 'event',
            direction: 'DESC',
            expected: <div className="icon-xs ml-1" />
        }
    ])(
        'it returns the header arrow',
        ({ selectedSortKey, sortKey, direction, expected }: TableHeaderProps & { expected: any }) => {
            expect(JSON.stringify(tableHeaderArrows({ selectedSortKey, sortKey, direction }))).toStrictEqual(
                JSON.stringify(expected)
            )
        }
    )

    test.each([
        { selectedSortKey: 'event', sortKey: 'event', direction: 'ASC', expected: 'ascending' },
        { selectedSortKey: 'event', sortKey: 'event', direction: 'DESC', expected: 'descending' },
        { selectedSortKey: 'event', sortKey: 'change', direction: 'ASC', expected: undefined }
    ])(
        'it returns aria-sort prop',
        ({ selectedSortKey, sortKey, direction, expected }: TableHeaderProps & { expected: any }) => {
            expect(tableAriaSort({ selectedSortKey, sortKey, direction })).toBe(expected)
        }
    )
})
