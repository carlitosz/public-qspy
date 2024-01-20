import React from 'react'
import { formatDistance } from 'date-fns'

import Pill from '@/components/Pill/Pill'
import TableEmpty from '@/components/Table/TableEmpty'
import { tablePillColor, tablePillIcon } from '@/utils/data/table'

import type { DailyChange, DomainEvent, DomainEventTableData } from 'types'

interface TableBodyProps {
    data: DomainEventTableData[] | []
    searchText?: string
}

const TableBody = ({ data, searchText }: TableBodyProps): JSX.Element => {
    if (data.length === 0) {
        return (
            <tbody aria-label="Empty table">
                <tr aria-disabled={true}>
                    <td width="100%" colSpan={5}>
                        <TableEmpty searchText={searchText} />
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody aria-label="Table body">
            {data.map(({ event, count, fs, ls, change }: DomainEvent & DailyChange, i: number) => {
                var name: string | undefined = event.split('\\').pop()

                return (
                    <tr aria-label={name} key={i}>
                        <td aria-label="Name" width={600}>
                            {name ?? ''}
                        </td>
                        <td aria-label="Count">{count}</td>
                        <td aria-label="Change">
                            <Pill color={tablePillColor(change)} icon={tablePillIcon(change)} label={`${change}`} />
                        </td>
                        <td aria-label="Last seen">{`${formatDistance(new Date(ls), new Date(), {
                            addSuffix: true
                        })}`}</td>
                        <td aria-label="First seen">{`${formatDistance(new Date(fs), new Date(), {
                            addSuffix: true
                        })}`}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody
