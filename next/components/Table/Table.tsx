import React, { useEffect, useState, FormEvent } from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon'
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon'
import { formatDistance } from 'date-fns'

import AnalyticsNumber from '@/components/Analytics/AnalyticsNumber'

import type { DailyChange, DomainEvent, DomainEventTableData } from 'types'

type TableData = DomainEventTableData[] | []

interface FormElements extends HTMLFormControlsCollection {
    search: HTMLInputElement
}

interface SearchElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface TableProps {
    data: TableData
    searchHandler: (term: string) => void
}

const Table = ({ data, searchHandler }: TableProps): JSX.Element => {
    const TableHeaders = ['Event', 'Count', '(+/-)', 'Last seen', 'First seen']
    const [searchTerm, setSearchTerm] = useState<string>('')

    useEffect(() => {
        if (searchTerm.length === 0) {
            searchHandler('')
        }
    }, [searchTerm, searchHandler])

    return (
        <>
            <form
                className="table-search relative"
                onSubmit={(e: FormEvent<SearchElement>) => {
                    e.preventDefault()
                    setSearchTerm(e.currentTarget.elements.search.value)
                    searchHandler(e.currentTarget.elements.search.value)
                }}
            >
                <label htmlFor="search" className="sr-only">
                    Search
                </label>
                <div className="absolute inset-y-0 rtl:inset-r-0 start-3 flex items-center ps-3 cursor-pointer">
                    {searchTerm.length === 0 ? (
                        <MagnifyingGlassIcon className="icon-sm text-title" />
                    ) : (
                        <div className="h-fit cursor-pointer">
                            <XCircleIcon
                                className="icon-sm text-primary cursor-pointer"
                                onClick={() => {
                                    searchHandler('')
                                    setSearchTerm('')
                                }}
                            />
                        </div>
                    )}
                </div>
                <input
                    aria-label="Search table"
                    className="block h-8 ps-10 text-xs text-title ring-1 ring-border rounded-s-md w-80 bg-hover/30 focus:outline-none focus:bg-component"
                    name="search"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.currentTarget.value)}
                    placeholder="Search"
                    value={searchTerm}
                    type="text"
                />
                <button
                    disabled={searchTerm.length === 0}
                    className="bg-component ring-1 ring-border rounded-e-md text-primary text-sm h-8 px-2 hover:bg-component disabled:bg-hover/40 disabled:text-text/40 disabled:cursor-not-allowed"
                >
                    Search
                </button>
            </form>
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
                                    <td>{`${formatDistance(new Date(ls), new Date(), { addSuffix: true })}`}</td>
                                    <td>{`${formatDistance(new Date(fs), new Date(), { addSuffix: true })}`}</td>
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
