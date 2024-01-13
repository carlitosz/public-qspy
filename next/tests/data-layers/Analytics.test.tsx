import React from 'react'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'

import { analyticsPillColor, analyticsPillIcon } from '@/data-layers/Analytics'

describe('Analytics data-layer', () => {
    test.each([
        { percentOfChange: 0, expected: 'neutral' },
        { percentOfChange: 1, expected: 'danger' },
        { percentOfChange: -1, expected: 'success' }
    ])('returns the pill color', ({ percentOfChange, expected }) => {
        expect(analyticsPillColor(percentOfChange)).toBe(expected)
    })

    test.each([
        { percentOfChange: 0, expected: undefined },
        { percentOfChange: 1, expected: <ArrowLongUpIcon className="analytics-icon-xs" /> },
        { percentOfChange: -1, expected: <ArrowLongDownIcon className="analytics-icon-xs" /> }
    ])('returns the pill icon', ({ percentOfChange, expected }) => {
        expect(JSON.stringify(analyticsPillIcon(percentOfChange))).toStrictEqual(JSON.stringify(expected))
    })
})
