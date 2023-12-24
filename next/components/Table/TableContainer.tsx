import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import Table from '@/components/Table/Table'
import TableEmptyMsg from '@/components/Table/TableEmptyMsg'
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

    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data, resultsPerPage))
        }
    }, [tData, resultsPerPage])

    useEffect(() => setCurrentPage(0), [resultsPerPage])

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
            setResultsPerPage={(desiredResults: number) => {
                if (desiredResults < 0 || desiredResults > tData.Data.length) {
                    return
                }

                setResultsPerPage(desiredResults)
            }}
            totalResults={tData.Data.length}
        />
    )

    return (
        <>
            {pages[currentPage].length > 0 && <div className="mb-2">{renderPagination('down')}</div>}
            <div className="table-container">
                {pages[currentPage].length > 0 ? (
                    <Table data={createTableData(pages[currentPage], yData.Data)} />
                ) : (
                    <TableEmptyMsg />
                )}
            </div>
            {pages[currentPage].length > 0 && <div className="my-2">{renderPagination('up')}</div>}
        </>
    )
}

export default TableContainer
