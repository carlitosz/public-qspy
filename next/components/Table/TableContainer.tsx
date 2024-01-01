import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import Table from '@/components/Table/Table'
import TableBody from '@/components/Table/TableBody'
import TableHeaders from '@/components/Table/TableHeaders'
import TableSearchForm from '@/components/Table/TableSearchForm'
import TableSkeleton from '@/components/Table/TableSkeleton'

import { createTableData, paginate, search } from '@/util/data'

import type { DropdownDirection } from '@/components/Dropdown/Dropdown'
import type { DomainEvent, GetEventsResponse } from 'types'

interface TableContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
}

const TableContainer = ({ data }: TableContainerProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEvent[]] | [[]]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(10)
    const [maxResults, setMaxResults] = useState<number>(0)
    const [searchText, setSearchText] = useState<string>('')

    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    // Initial mount.
    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data, resultsPerPage))
            setMaxResults(tData.Data.length)
        }
    }, [tData, resultsPerPage])

    // Search
    useEffect(() => {
        if (tData && searchText.length > 0) {
            const results = search(tData.Data, searchText)

            if (results.length > 0) {
                setPages(paginate(results, results.length))
                setMaxResults(results.length)
                setResultsPerPage(results.length)
            } else {
                setPages(paginate([]))
                setMaxResults(0)
                setResultsPerPage(10)
            }
        }
    }, [tData, searchText, resultsPerPage])

    // Reset page to 0.
    useEffect(() => setCurrentPage(0), [resultsPerPage, searchText])

    const resetToPristine = (): void => {
        setSearchText('')
        setResultsPerPage(10)
        setPages(paginate(tData.Data, resultsPerPage))
        setMaxResults(tData.Data.length)
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
                    onSubmitHandler={(text: string) => setSearchText(text)}
                />
                <Table>
                    <TableHeaders headers={['Event', 'Count', '(+/-)', 'Last seen', 'First seen']} />
                    <TableBody data={createTableData(pages[currentPage], yData.Data)} searchText={searchText} />
                </Table>
            </div>
            <div className="my-2">{renderPagination('up')}</div>
        </>
    )
}

export default TableContainer
