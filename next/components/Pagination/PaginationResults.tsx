import React from 'react'

interface PaginationResultsProps {
    currentPage: number
    currentPageSize: number
    resultsPerPage: number
    searchText?: string
    totalResults: number
}

const PaginationResults = ({
    currentPage,
    currentPageSize,
    resultsPerPage,
    searchText,
    totalResults
}: PaginationResultsProps): JSX.Element => {
    if (searchText && searchText.length > 0) {
        return (
            <span aria-label="Pagination results" className="text-sm text-title antialiased">
                Showing{' '}
                <span className="font-semibold text-primary">
                    {`${currentPage * resultsPerPage + 1} - ${currentPage * resultsPerPage + currentPageSize}`}
                </span>{' '}
                of <span className="font-semibold text-primary">{totalResults}</span> results for &quot;{searchText}
                &quot;
            </span>
        )
    }

    return (
        <span aria-label="Pagination results" className="text-sm text-title antialiased">
            Showing{' '}
            <span className="font-semibold text-primary">
                {`${currentPage * resultsPerPage + 1} - ${currentPage * resultsPerPage + currentPageSize}`}
            </span>{' '}
            of <span className="font-semibold text-primary">{totalResults}</span> events
        </span>
    )
}

export default PaginationResults
