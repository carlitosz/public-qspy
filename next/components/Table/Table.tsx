import React from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon'
import { formatDistance } from 'date-fns'

import AnalyticsNumber from '@/components/Analytics/AnalyticsNumber'

import type { DailyChange, DomainEvent, DomainEventTableData } from 'types'

type TableData = DomainEventTableData[] | []

interface TableProps {
    data: TableData
}

const Table = ({ data }: TableProps): JSX.Element => {
    const TableHeaders = ['Event', 'Count', '(+/-)', 'Last seen', 'First seen']

    return (
        <>
            <div className="table-search">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <MagnifyingGlassIcon className="icon-sm" />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                    />
                </div>
            </div>
            <div className="table">
                <table className="table-items">
                    <thead>
                        <tr>
                            {TableHeaders.map(
                                (header: string, i: number): React.ReactNode => (
                                    <th scope="col" key={i}>
                                        {header}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
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
                                    <td>{`${formatDistance(new Date(fs), new Date(), { addSuffix: true })}`}</td>
                                    <td>{`${formatDistance(new Date(ls), new Date(), { addSuffix: true })}`}</td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table
