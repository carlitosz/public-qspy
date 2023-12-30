import Pagino from 'pagino'
import React, { useMemo } from 'react'

import PaginationGoToPageForm from '@/components/Pagination/PaginationGoToPageForm'
import PaginationNav from '@/components/Pagination/PaginationNav'
import PaginationResults from '@/components/Pagination/PaginationResults'
import PaginationResultsPerPage from '@/components/Pagination/PaginationResultsPerPage'

import type { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface PaginationProps {
    currentPage: number
    currentPageSize: number
    dropdownDirection: DropdownDirection
    goToPage: (desiredPage: number) => void
    numPages: number
    resultsPerPage: number
    searchText: string
    setResultsPerPage: (desiredResults: number) => void
    totalResults: number
}

const Pagination = ({
    currentPage,
    currentPageSize,
    dropdownDirection,
    goToPage,
    numPages,
    resultsPerPage,
    searchText,
    setResultsPerPage,
    totalResults
}: PaginationProps): JSX.Element => {
    const pagino: Pagino = useMemo(() => {
        const _: Pagino = new Pagino()
        _.setCount(numPages)
        _.setPage(currentPage)

        return _
    }, [numPages, currentPage])

    return (
        <div aria-label="Pagination" className="flex justify-between items-center">
            <PaginationResults
                currentPage={pagino.page - 1}
                currentPageSize={currentPageSize}
                resultsPerPage={resultsPerPage}
                searchText={searchText}
                totalResults={totalResults}
            />
            <div aria-disabled={currentPageSize === 0 && searchText.length > 0} className="navigation">
                <PaginationNav
                    currentPage={currentPage}
                    goToPage={goToPage}
                    pagino={pagino}
                    totalNumberOfPages={numPages}
                />
                <div className="ml-2">
                    <PaginationResultsPerPage
                        dropdownDirection={dropdownDirection}
                        resultsPerPage={resultsPerPage}
                        updateResultsPerPage={setResultsPerPage}
                        totalResults={totalResults}
                    />
                </div>
                <div className="ml-2">
                    <PaginationGoToPageForm disabled={numPages <= 1} max={numPages} goToPage={goToPage} />
                </div>
            </div>
        </div>
    )
}

export default Pagination
