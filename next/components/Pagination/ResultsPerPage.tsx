import React from 'react'

interface ResultsPerPageProps {
    currentPage: number
    currentPageTotal: number
    resultsPerPage: number
    totalResults: number
}

const ResultsPerPage = ({
    currentPage,
    currentPageTotal,
    resultsPerPage,
    totalResults
}: ResultsPerPageProps): JSX.Element => {
    return (
        <p className="text-xs text-title antialiased">
            Showing{' '}
            <span className="font-semibold text-primary">
                {currentPage * resultsPerPage + 1} - {currentPage * resultsPerPage + currentPageTotal}
            </span>{' '}
            of <span className="font-semibold text-primary">{totalResults}</span>
        </p>
    )
}

export default ResultsPerPage
