import React from 'react'
import { formatDistance } from 'date-fns'

import AnalyticsNumber from '@/components/Analytics/AnalyticsNumber'
import TableEmpty from '@/components/Table/TableEmpty'

import type { DailyChange, DomainEvent, DomainEventTableData } from 'types'

interface TableBodyProps {
    data: DomainEventTableData[] | []
    searchText?: string
}

const TableBody = ({ data, searchText }: TableBodyProps): JSX.Element => {
    if (data.length === 0) {
        return (
            <tbody>
                <tr>
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
                        <td width={500}>{name ?? ''}</td>
                        <td>{count}</td>
                        <td>
                            <AnalyticsNumber className="table-change" number={change} style="none" />
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
