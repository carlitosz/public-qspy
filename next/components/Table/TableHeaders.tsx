import React, { useState } from 'react'

import { tableHeaderArrows, tableAriaSort } from '@/helpers/table-helper'

import type { DomainEventTableData } from 'types'

export type SortDirection = 'ASC' | 'DESC'

export interface SortableHeader {
    value: string
    sortKey: keyof DomainEventTableData
}

interface TableHeadersProps {
    data: DomainEventTableData[] | []
    headers: SortableHeader[]
    sortHandler: (sortKey: SortableHeader['sortKey'], direction: SortDirection) => void
}

const TableHeaders = ({ data, headers, sortHandler }: TableHeadersProps): JSX.Element => {
    const [localSort, setLocalSort] = useState<{ direction: SortDirection; sortKey: SortableHeader['sortKey'] }>({
        sortKey: 'count',
        direction: 'DESC'
    })

    const handleSort = (sortKey: SortableHeader['sortKey']): void => {
        if (data.length === 0) return

        const direction: SortDirection = localSort.direction === 'ASC' ? 'DESC' : 'ASC'

        sortHandler(sortKey, direction)
        setLocalSort({ sortKey, direction })
    }

    return (
        <thead>
            <tr>
                {headers.map(
                    ({ value, sortKey }: SortableHeader, i: number): React.ReactNode => (
                        <th
                            aria-sort={tableAriaSort({
                                selectedSortKey: sortKey,
                                sortKey: localSort.sortKey,
                                direction: localSort.direction
                            })}
                            scope="col"
                            key={i}
                            onClick={() => handleSort(sortKey)}
                        >
                            <div className="inline-flex items-center">
                                {value}
                                {tableHeaderArrows({
                                    selectedSortKey: sortKey,
                                    sortKey: localSort.sortKey,
                                    direction: localSort.direction
                                })}
                            </div>
                        </th>
                    )
                )}
            </tr>
        </thead>
    )
}

export default TableHeaders
