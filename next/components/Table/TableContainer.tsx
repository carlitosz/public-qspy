import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import Table from '@/components/Table/Table'
import TableBody from '@/components/Table/TableBody'
import TableHeaders, { SortDirection, SortableHeader } from '@/components/Table/TableHeaders'
import TableSearchForm from '@/components/Table/TableSearchForm'
import TableSkeleton from '@/components/Table/TableSkeleton'

import { createTableData, paginate, search, sortBy } from '@/util/data'

import type { DropdownDirection } from '@/components/Dropdown/Dropdown'
import type { DomainEventTableData, GetEventsResponse } from 'types'

interface TableContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
}

const TableContainer = ({ data }: TableContainerProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEventTableData[]] | [[]]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(10)
    const [maxResults, setMaxResults] = useState<number>(0)
    const [searchText, setSearchText] = useState<string>('')
    const [sortedData, setSortedData] = useState<DomainEventTableData[] | []>([])

    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    // Initial mount.
    useEffect(() => {
        if (tData && yData) {
            setSortedData(createTableData(tData.Data, yData.Data))
        }
    }, [tData, yData])

    // Results per page changed.
    useEffect(() => {
        setPages(paginate(sortedData, resultsPerPage))
        setMaxResults(sortedData.length)
    }, [resultsPerPage, sortedData])

    const resetToPristine = (): void => {
        setSearchText('')
        setResultsPerPage(10)
        setPages(paginate(sortedData, resultsPerPage))
        setMaxResults(sortedData.length)
    }

    const handleSearch = (searchText: string): void => {
        if (searchText.length === 0) {
            return
        }

        const searchResults = search(sortedData, searchText)

        setPages(paginate(searchResults, searchResults.length))
        setMaxResults(searchResults.length)
        setSearchText(searchText)
    }

    if (tValidating || yValidating) {
        return <TableSkeleton />
    }

    if (tError || yError) {
        return <>error</>
    }

    const renderPagination = (direction: DropdownDirection) => (
        <Pagination
            currentPage={currentPage + 1}
            currentPageSize={pages[currentPage].length}
            dropdownDirection={direction}
            goToPage={(desiredPage: number) => setCurrentPage(desiredPage)}
            numPages={pages.length}
            resultsPerPage={resultsPerPage}
            searchText={searchText}
            setResultsPerPage={(desiredResults: number) => setResultsPerPage(desiredResults)}
            totalResults={maxResults}
        />
    )

    return (
        <>
            <div className="mb-2">{renderPagination('down')}</div>
            <div className="table-container">
                <TableSearchForm
                    clearSearchHandler={resetToPristine}
                    onSubmitHandler={(text: string) => handleSearch(text)}
                />
                <Table>
                    <TableHeaders
                        headers={[
                            { value: 'Event', sortKey: 'event' },
                            { value: 'Count', sortKey: 'count' },
                            { value: '(+/-)', sortKey: 'change' },
                            { value: 'Last seen', sortKey: 'ls' },
                            { value: 'First seen', sortKey: 'fs' }
                        ]}
                        sortHandler={(sortKey: SortableHeader['sortKey'], direction: SortDirection): void =>
                            setPages(paginate(sortBy(sortedData, sortKey, direction), resultsPerPage))
                        }
                    />
                    <TableBody data={pages[currentPage]} searchText={searchText} />
                </Table>
            </div>
            <div className="my-2">{renderPagination('up')}</div>
        </>
    )
}

export default TableContainer
