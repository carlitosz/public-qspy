import React from 'react'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'

import { tablePillColor, tablePillIcon } from '@/utils/data/table'

describe('Table data-layer ', () => {
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
})
