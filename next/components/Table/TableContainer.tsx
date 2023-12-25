import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import Table from '@/components/Table/Table'
import TableBody from '@/components/Table/TableBody'
import TableHeaders from '@/components/Table/TableHeaders'
import TableSearchForm from '@/components/Table/TableSearchForm'
import TableSkeleton from '@/components/Table/TableSkeleton'

import { createTableData, paginate } from '@/util/data'

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

    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data, resultsPerPage))
            setMaxResults(tData.Data.length)
        }
    }, [tData, resultsPerPage])

    useEffect(() => setCurrentPage(0), [resultsPerPage])

    useEffect(() => {
        if (!tData) {
            return
        }

        if (searchText.length > 0) {
            const searchResults = tData.Data.filter((value: DomainEvent) =>
                value.event.toLowerCase().includes(searchText.toLowerCase().trim())
            )

            searchResults.length > 0 ? setPages(paginate(searchResults, resultsPerPage)) : setPages([[]])
            setMaxResults(searchResults.length)
        } else {
            setPages(paginate(tData.Data, resultsPerPage))
            setMaxResults(tData.Data.length)
        }
    }, [tData, searchText, resultsPerPage])

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
            goToPage={(desiredPage: number) => {
                if (desiredPage < 0 || desiredPage >= pages.length) {
                    return
                }

                setCurrentPage(desiredPage)
            }}
            numPages={pages.length}
            resultsPerPage={resultsPerPage}
            searchText={searchText}
            setResultsPerPage={(desiredResults: number) => {
                if (desiredResults < 0 || desiredResults > tData.Data.length) {
                    return
                }

                setResultsPerPage(desiredResults)
            }}
            totalResults={maxResults}
        />
    )

    return (
        <>
            <div className="pagination-container mb-2">{renderPagination('down')}</div>
            <div className="table-container">
                <TableSearchForm onSubmitHandler={(text: string) => setSearchText(text)} />
                <Table>
                    <TableHeaders headers={['Event', 'Count', '(+/-)', 'Last seen', 'First seen']} />
                    <TableBody data={createTableData(pages[currentPage], yData.Data)} searchText={searchText} />
                </Table>
            </div>
            <div className="pagination-container my-2">{renderPagination('up')}</div>
        </>
    )
}

export default TableContainer
