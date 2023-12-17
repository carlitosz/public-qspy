import React from 'react'

interface PaginationProps {
    currentPage: number
    goToPage: (desiredPage: number) => void
    numPages: number
    totalResults: number
}

const Pagination = ({ currentPage, goToPage, numPages, totalResults }: PaginationProps): JSX.Element => {
    const pageNumbers = Array(numPages).fill('x', 0, numPages)

    if (totalResults === 0) {
        return <></>
    }

    return (
        <nav className="pagination" aria-label="Table Navigation" role="navigation">
            <span className="results">
                Showing <span className="font-semibold text-primary">1-10</span> of{' '}
                <span className="font-semibold text-primary">1000</span>
            </span>
            <ul>
                <li>
                    <a
                        aria-label="Go to previous page"
                        aria-disabled={currentPage === 0}
                        onClick={() => goToPage(currentPage - 1)}
                        onKeyDown={() => goToPage(currentPage - 1)}
                        role="button"
                        tabIndex={0}
                    >
                        Back
                    </a>
                </li>
                {pageNumbers.map((value: string, index: number) => {
                    return (
                        <li key={index}>
                            <a
                                aria-label={`Page ${index + 1}`}
                                aria-current={index === currentPage}
                                onClick={() => goToPage(index)}
                                onKeyDown={() => goToPage(index)}
                                role="button"
                                tabIndex={index + 1}
                            >
                                {index + 1}
                            </a>
                        </li>
                    )
                })}
                <li>
                    <a
                        aria-label="Go to next page"
                        aria-disabled={currentPage === pageNumbers.length - 1}
                        onClick={() => goToPage(currentPage + 1)}
                        onKeyDown={() => goToPage(currentPage + 1)}
                        role="button"
                        tabIndex={pageNumbers.length + 1}
                    >
                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination
