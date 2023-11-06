import React from 'react'
import ArrowLongLeftIcon from '@heroicons/react/24/outline/ArrowLongLeftIcon'
import ArrowLongRightIcon from '@heroicons/react/24/outline/ArrowLongRightIcon'
import BarsArrowDownIcon from '@heroicons/react/24/outline/BarsArrowDownIcon'
import BarsArrowUpIcon from '@heroicons/react/24/outline/BarsArrowUpIcon'
import DocumentChartBarIcon from '@heroicons/react/24/outline/DocumentChartBarIcon'

import Toolbar from '../Toolbar/Toolbar'
import { SortDirection } from 'types'

interface PaginationProps {
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

const Pagination = ({
    changeResultsPerPage,
    changeSortDirection,
    currentPage,
    currentPageTotal,
    goToPage,
    numPages,
    resultsPerPage,
    sortDirection,
    totalResults
}: PaginationProps): JSX.Element => {
    const pageNumbers = Array(numPages).fill('x', 0, numPages)

    if (totalResults === 0) {
        return <></>
    }

    return (
        <div className="pagination-container">
            <div className="results">
                <p className="text-dark text-xs antialiased">
                    <span className="">Showing </span>
                    <span className="font-medium">
                        {currentPage * resultsPerPage + 1} - {currentPage * resultsPerPage + currentPageTotal}
                    </span>{' '}
                    of <span className="font-medium">{totalResults}</span>
                    <span className=""> results</span>
                </p>
            </div>
            <div className="pagination">
                <div aria-hidden="true" className="pagination-previous" onClick={() => goToPage(currentPage - 1)}>
                    <ArrowLongLeftIcon className="icon-sm" />
                    <p className="ml-2">Previous</p>
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
            <div className="dropdown">
                <Toolbar
                    direction="up"
                    disabled={totalResults === 0}
                    dropdown={[
                        { title: 'Results per page' },
                        {
                            icon: <DocumentChartBarIcon className="menu-icon-sm" />,
                            label: 20,
                            onClick: () => changeResultsPerPage(20),
                            selected: resultsPerPage === 20
                        },
                        {
                            icon: <DocumentChartBarIcon className="menu-icon-sm" />,
                            label: 40,
                            onClick: () => changeResultsPerPage(40),
                            selected: resultsPerPage === 40
                        },
                        {
                            icon: <DocumentChartBarIcon className="menu-icon-sm" />,
                            label: `All (${totalResults})`,
                            onClick: () => changeResultsPerPage(totalResults),
                            selected: resultsPerPage === totalResults
                        },
                        { divider: true },
                        { title: 'Sort' },
                        {
                            icon: <BarsArrowUpIcon className="menu-icon-sm" />,
                            label: 'Ascending',
                            onClick: () => changeSortDirection('ASC'),
                            selected: sortDirection === 'ASC'
                        },
                        {
                            icon: <BarsArrowDownIcon className="menu-icon-sm" />,
                            label: 'Descending',
                            onClick: () => changeSortDirection('DESC'),
                            selected: sortDirection === 'DESC'
                        }
                    ]}
                />
            </div>
        </div>
    )
}

export default Pagination
