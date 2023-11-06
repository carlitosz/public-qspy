import React from 'react'

import Pagination from '@/components/Pagination/Pagination'
import { SortDirection } from 'types'

interface BarChartContainerFooterProps {
    changeResultsPerPage: (desiredResultsPerPage: number) => void
    changeSortDirection: (desiredSortDirection: SortDirection) => void
    currentPage: number
    currentPageTotal: number
    goToPage: (desiredPage: number) => void
    numPages: number
    resultsPerPage: number
    sortDirection: SortDirection
    totalResults: number
}

const BarChartContainerFooter = ({
    changeResultsPerPage,
    changeSortDirection,
    currentPage,
    currentPageTotal,
    goToPage,
    numPages,
    resultsPerPage,
    sortDirection,
    totalResults
}: BarChartContainerFooterProps): JSX.Element => {
    return (
        <div className="border-t border-t-extralight">
            <Pagination
                changeResultsPerPage={changeResultsPerPage}
                changeSortDirection={changeSortDirection}
                currentPage={currentPage}
                currentPageTotal={currentPageTotal}
                goToPage={goToPage}
                numPages={numPages}
                resultsPerPage={resultsPerPage}
                sortDirection={sortDirection}
                totalResults={totalResults}
            />
        </div>
    )
}

export default BarChartContainerFooter
