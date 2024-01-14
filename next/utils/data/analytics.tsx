import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/outline/ArrowLongUpIcon'

import type { PillProps } from '@/components/Pill/Pill'

export const analyticsPillColor = (percentOfChange: number): PillProps['color'] => {
    if (percentOfChange === 0) {
        return 'neutral'
    }

    return percentOfChange > 0 ? 'danger' : 'success'
}

export const analyticsPillIcon = (percentOfChange: number): PillProps['icon'] => {
    if (percentOfChange === 0) {
        return undefined
    }

    return percentOfChange > 0 ? (
        <ArrowLongUpIcon className="analytics-icon-xs" />
    ) : (
        <ArrowLongDownIcon className="analytics-icon-xs" />
    )
}
