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
            <tbody aria-label="">
                <tr aria-disabled={true}>
                    <td width="100%" colSpan={5}>
                        <TableEmpty searchText={searchText} />
                    </td>
                </tr>
            </tbody>
        )
    }

    return (
        <tbody>
            {data.map(({ event, count, fs, ls, change }: DomainEvent & DailyChange, i: number) => {
                var name: string | undefined = event.split('\\').pop()

                return (
                    <tr key={i}>
                        <td width={600}>{name ?? ''}</td>
                        <td>{count}</td>
                        <td>
                            <Pill color={tablePillColor(change)} icon={tablePillIcon(change)} label={`${change}`} />
                        </td>
                        <td>{`${formatDistance(new Date(ls), new Date(), { addSuffix: true })}`}</td>
                        <td>{`${formatDistance(new Date(fs), new Date(), { addSuffix: true })}`}</td>
                    </tr>
                )
            })}
        </tbody>
    )
}

export default TableBody
