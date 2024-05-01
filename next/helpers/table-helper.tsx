import React, { AriaAttributes } from 'react'
import ArrowLongDownIcon from '@heroicons/react/24/solid/ArrowLongDownIcon'
import ArrowLongUpIcon from '@heroicons/react/24/solid/ArrowLongUpIcon'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import type { PillProps } from '@/components/Pill/Pill'
import { DomainEventTableData, SortDirection } from 'types'

export interface TableHeaderProps {
    selectedSortKey: keyof DomainEventTableData
    sortKey: keyof DomainEventTableData
    direction: SortDirection
}

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

export const tableHeaderArrows = ({ selectedSortKey, sortKey, direction }: TableHeaderProps): JSX.Element => {
    if (selectedSortKey === sortKey) {
        return tableHeaderArrow({ direction })
    }

    return <div className="icon-xs ml-1" />
}

const tableHeaderArrow = ({ direction }: Partial<TableHeaderProps>): JSX.Element =>
    direction === 'ASC' ? (
        <ChevronDownIcon aria-label="chevron-down-icon" className="icon-xs ml-1 [&>path]:stroke-[2]" />
    ) : (
        <ChevronUpIcon aria-label="chevron-up-icon" className="icon-xs ml-1 [&>path]:stroke-[2]" />
    )

export const tableAriaSort = ({
    selectedSortKey,
    sortKey,
    direction
}: TableHeaderProps): AriaAttributes['aria-sort'] => {
    if (selectedSortKey !== sortKey) {
        return undefined
    }

    return direction === 'ASC' ? 'ascending' : 'descending'
}
