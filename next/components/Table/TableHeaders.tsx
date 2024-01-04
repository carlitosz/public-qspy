import React, { AriaAttributes, useEffect, useState } from 'react'

import type { DomainEventTableData } from 'types'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

export type SortDirection = 'ASC' | 'DESC'

export interface SortableHeader {
    value: string
    sortKey: keyof DomainEventTableData
}

interface TableHeadersProps {
    headers: SortableHeader[]
    sortHandler: (sortKey: SortableHeader['sortKey'], direction: SortDirection) => void
}

const TableHeaders = ({ headers, sortHandler }: TableHeadersProps): JSX.Element => {
    const [localSort, setLocalSort] = useState<{ direction: SortDirection; sortKey: SortableHeader['sortKey'] }>({
        sortKey: 'change',
        direction: 'DESC'
    })

    useEffect(() => {})

    const handleSort = (sortKey: SortableHeader['sortKey']): void => {
        const direction: SortDirection = localSort.direction === 'ASC' ? 'DESC' : 'ASC'

        sortHandler(sortKey, direction)
        setLocalSort({ sortKey, direction })
    }

    const arrow = () =>
        localSort.direction === 'ASC' ? (
            <ChevronDownIcon className="icon-xs ml-1 [&>path]:stroke-[2]" />
        ) : (
            <ChevronUpIcon className="icon-xs ml-1 [&>path]:stroke-[2]" />
        )

    const ariaSort = (sortKey: SortableHeader['sortKey']): AriaAttributes['aria-sort'] => {
        if (localSort.sortKey !== sortKey) {
            return undefined
        }

        return localSort.direction === 'ASC' ? 'ascending' : 'descending'
    }

    return (
        <thead>
            <tr>
                {headers.map(
                    ({ value, sortKey }: SortableHeader, i: number): React.ReactNode => (
                        <th aria-sort={ariaSort(sortKey)} scope="col" key={i} onClick={() => handleSort(sortKey)}>
                            <div className="inline-flex items-center">
                                {value}
                                {localSort.sortKey === sortKey ? arrow() : <div className="invisible">{arrow()}</div>}
                            </div>
                        </th>
                    )
                )}
            </tr>
        </thead>
    )
}

export default TableHeaders
