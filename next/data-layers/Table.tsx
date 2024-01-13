import React from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/solid/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/solid/ArrowLongUpIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'

import type { PillProps } from '@/components/Pill/Pill'

export const tablePillColor = (change: number): PillProps['color'] => {
    if (change === 0) {
        return 'neutral'
    }

    return change > 0 ? 'danger' : 'success'
}

export const tablePillIcon = (change: number): PillProps['icon'] => {
    if (change === 0) {
        return <ArrowsRightLeftIcon className="analytics-icon-xs" />
    }

    return change > 0 ? (
        <ArrowLongUpIcon className="analytics-icon-xs" />
    ) : (
        <ArrowLongDownIcon className="analytics-icon-xs" />
    )
}
