import React from 'react'
import ArrowLongLeftIcon from '@heroicons/react/24/outline/ArrowLongLeftIcon'
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon'

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
        <div className="pagination-container">
            <div className="pagination">
                <div aria-hidden="true" className="pagination-previous" onClick={() => goToPage(currentPage - 1)}>
                    <ArrowLongLeftIcon className="icon-sm" />
                    <p className="ml-2">Back</p>
                </div>

                <div className="pagination-numbers">
                    {pageNumbers.map((value: string, index: number) => (
                        <p
                            className={`pagination-item ${currentPage === index ? 'selected' : ''}`}
                            key={index}
                            onClick={() => goToPage(index)}
                            aria-hidden="true"
                        >
                            {index + 1}
                        </p>
                    ))}
                </div>

                <div aria-hidden="true" className="pagination-next" onClick={() => goToPage(currentPage + 1)}>
                    <p className="mr-2">Next</p>
                    <ArrowLongRightIcon className="icon-sm" />
                </div>
            </div>
        </div>
    )
}

export default Pagination
