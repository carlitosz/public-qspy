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
    const results = <span className="font-semibold text-primary">{totalResults}</span>

    if (searchText) {
        return (
            <span aria-label="Search results" className="text-base text-title antialiased">
                Showing {results} results for &quot;{searchText}&quot;
            </span>
        )
    }

    return (
        <span aria-label="Pagination results" className="text-base text-title antialiased">
            Showing{' '}
            <span className="font-semibold text-primary">{`${currentPage * resultsPerPage + 1} - ${
                currentPage * resultsPerPage + currentPageSize
            }`}</span>{' '}
            of {results} events
        </span>
    )
}

export default PaginationResults
