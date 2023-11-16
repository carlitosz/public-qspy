import React from 'react'
import BarsArrowDownIcon from '@heroicons/react/24/outline/BarsArrowDownIcon'
import BarsArrowUpIcon from '@heroicons/react/24/outline/BarsArrowUpIcon'
import DocumentChartBarIcon from '@heroicons/react/24/outline/DocumentChartBarIcon'

import Pagination from '@/components/Pagination/Pagination'
import Toolbar from '@/components/Toolbar/Toolbar'
import { Orientation, SortDirection } from 'types'

interface BarChartContainerFooterProps {
    changeResultsPerPage: (desiredResultsPerPage: number) => void
    changeSortDirection: (desiredSortDirection: SortDirection) => void
    currentPage: number
    currentPageTotal: number
    goToPage: (desiredPage: number) => void
    numPages: number
    orientation: Orientation
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
    orientation,
    resultsPerPage,
    sortDirection,
    totalResults
}: BarChartContainerFooterProps): JSX.Element => {
    return (
        <div className="footer">
            <p className="text-title text-xs antialiased">
                <span className="">Showing </span>
                <span className="font-medium">
                    {currentPage * resultsPerPage + 1} - {currentPage * resultsPerPage + currentPageTotal}
                </span>{' '}
                of <span className="font-medium">{totalResults}</span>
                <span className=""> results</span>
            </p>
            <div className="flex justify-end items-center">
                <Pagination
                    currentPage={currentPage}
                    goToPage={goToPage}
                    numPages={numPages}
                    totalResults={totalResults}
                />
                <div className="h-8 w-1 mx-4 border-r border-r-border" />
                <Toolbar
                    direction="up"
                    disabled={totalResults === 0}
                    items={[
                        { title: 'Results per page' },
                        {
                            icon: <DocumentChartBarIcon className="menu-icon-sm" />,
                            label: 20,
                            onClick: () => changeResultsPerPage(20),
                            selected: resultsPerPage === 20
                        },
                        {
                            disabled: orientation === 'horizontal',
                            icon: <DocumentChartBarIcon className="menu-icon-sm" />,
                            label: 40,
                            onClick: () => changeResultsPerPage(40),
                            selected: resultsPerPage === 40
                        },
                        {
                            disabled: orientation === 'horizontal',
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

export default BarChartContainerFooter
