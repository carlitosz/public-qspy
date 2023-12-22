import React from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'

import Dropdown from '../Dropdown/Dropdown'

interface PaginationProps {
    currentPage: number
    currentPageTotal: number
    goToPage: (desiredPage: number) => void
    numPages: number
    resultsPerPage: number
    totalResults: number
}

const Pagination = ({
    currentPage,
    currentPageTotal,
    goToPage,
    numPages,
    resultsPerPage,
    totalResults
}: PaginationProps): JSX.Element => {
    const pageNumbers = Array(numPages).fill('x', 0, numPages)

    if (totalResults === 0) {
        return <></>
    }

    return (
        <div className="pagination">
            <div className="navigation">
                <nav aria-label="Table Navigation" role="navigation">
                    <ul className="navigation-numbers">
                        <li>
                            <a
                                aria-label="Go to first page"
                                aria-disabled={currentPage === 0}
                                onClick={() => goToPage(0)}
                                onKeyDown={() => goToPage(0)}
                                role="button"
                                tabIndex={0}
                            >
                                <ChevronDoubleLeftIcon className="icon-xs" />
                            </a>
                        </li>
                        <li>
                            <a
                                aria-label="Go to previous page"
                                aria-disabled={currentPage === 0}
                                onClick={() => goToPage(currentPage - 1)}
                                onKeyDown={() => goToPage(currentPage - 1)}
                                role="button"
                                tabIndex={0}
                            >
                                <ChevronLeftIcon className="icon-xs" />
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
                                <ChevronRightIcon className="icon-xs" />
                            </a>
                        </li>
                        <li>
                            <a
                                aria-label="Go to last page"
                                aria-disabled={currentPage === pageNumbers.length - 1}
                                onClick={() => goToPage(pageNumbers.length - 1)}
                                onKeyDown={() => goToPage(pageNumbers.length - 1)}
                                role="button"
                                tabIndex={pageNumbers.length + 1}
                            >
                                <ChevronDoubleRightIcon className="icon-xs" />
                            </a>
                        </li>
                    </ul>
                </nav>
                <div className="results-per-page">
                    <Dropdown
                        closeIcon={<ChevronUpIcon className="icon-xs mr-1" />}
                        direction="up"
                        disabled={false}
                        menuItems={[
                            { title: 'Results per page' },
                            {
                                label: 10,
                                onClick: () => {},
                                selected: resultsPerPage === 10
                            },
                            { label: 20, onClick: () => {}, selected: resultsPerPage === 20 }
                        ]}
                        openIcon={<ChevronDownIcon className="icon-xs mr-1" />}
                        title={`${resultsPerPage}`}
                    />
                </div>
            </div>
            <span className="text-sm text-title">
                Showing{' '}
                <span className="font-semibold text-primary">
                    {currentPage * resultsPerPage + 1} - {currentPage * resultsPerPage + currentPageTotal}
                </span>{' '}
                of <span className="font-semibold text-primary">{totalResults}</span>
            </span>
        </div>
    )
}

export default Pagination
