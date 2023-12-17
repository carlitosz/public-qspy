import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import Table from '@/components/Table/Table'
import { paginate } from '@/util/data'

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
        return (
            <div role="status" className="chart animate-pulse">
                skeleton
            </div>
        )
    }

    if (tError || yError || tData.Data.length === 0) {
        return <div className="chart">empty</div>
    }

    return (
        <div className="block">
            <div className="table-container">
                <Table data={pages[currentPage]} />
            </div>
            <div className="py-4">
                <Pagination
                    currentPage={currentPage}
                    goToPage={(desiredPage: number) => {
                        if (desiredPage < 0 || desiredPage >= pages.length) {
                            return
                        }

                        setCurrentPage(desiredPage)
                    }}
                    numPages={pages.length}
                    totalResults={tData.Data.length}
                />
            </div>
        </div>
    )
}

export default TableContainer
