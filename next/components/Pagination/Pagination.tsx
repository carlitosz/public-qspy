import React from 'react'
import BarsArrowDownIcon from '@heroicons/react/24/outline/BarsArrowDownIcon'
import BarsArrowUpIcon from '@heroicons/react/24/outline/BarsArrowUpIcon'
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/solid/ChevronDoubleLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/solid/ChevronDoubleRightIcon'
import DocumentChartBarIcon from '@heroicons/react/24/outline/DocumentChartBarIcon'
import EllipsisHorizontalCircleIcon from '@heroicons/react/24/outline/EllipsisHorizontalCircleIcon'

import PaginationItem from '@/components/Pagination/PaginationItem'
import Toolbar from '../ApexChart/Toolbar/Toolbar'
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

const iconClass = 'h-5 w-5 mr-3'

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
    const unselected = `text-sm font-normal leading-none cursor-pointer text-neutral-500 hover:text-indigo-500 border-t-2 border-transparent hover:border-indigo-500 p-4 duration-150 ease-out hover:ease-in`
    const selected = `text-sm font-normal leading-none cursor-pointer text-indigo-600 hover:text-neutral-500 border-t-2 p-4 border-indigo-500 duration-150 ease-out hover:ease-in`

    return (
        <div className="w-full flex flex-col align-center justify-center">
            <div className="w-full flex flex-row justify-center items-center">
                <PaginationItem icon={<ChevronDoubleLeftIcon className={iconClass} />} onClick={() => goToPage(0)} />
                <PaginationItem
                    icon={<ChevronLeftIcon className={iconClass} />}
                    onClick={() => goToPage(currentPage - 1)}
                />

                <div className="sm:flex hidden">
                    {pageNumbers.map((value: string, index: number) => (
                        <PaginationItem
                            key={index}
                            klass={currentPage === index ? selected : unselected}
                            onClick={() => goToPage(index)}
                            text={`${index + 1}`}
                        />
                    ))}
                </div>

                <PaginationItem
                    icon={<ChevronRightIcon className={iconClass} />}
                    onClick={() => goToPage(currentPage + 1)}
                />
                <PaginationItem
                    icon={<ChevronDoubleRightIcon className={iconClass} />}
                    onClick={() => goToPage(numPages - 1)}
                />

                <Toolbar
                    openIcon={<EllipsisHorizontalCircleIcon className="h-6 w-6 animate-wiggle" />}
                    dropdown={[
                        { title: 'Results per page' },
                        {
                            icon: <DocumentChartBarIcon className={iconClass} />,
                            label: 20,
                            onClick: () => changeResultsPerPage(20),
                            selected: resultsPerPage === 20
                        },
                        {
                            icon: <DocumentChartBarIcon className={iconClass} />,
                            label: 40,
                            onClick: () => changeResultsPerPage(40),
                            selected: resultsPerPage === 40
                        },
                        {
                            icon: <DocumentChartBarIcon className={iconClass} />,
                            label: `All (${totalResults})`,
                            onClick: () => changeResultsPerPage(totalResults),
                            selected: resultsPerPage === totalResults
                        },
                        { divider: true },
                        { title: 'Sort' },
                        {
                            icon: <BarsArrowUpIcon className={iconClass} />,
                            label: 'Ascending',
                            onClick: () => changeSortDirection('ASC'),
                            selected: sortDirection === 'ASC'
                        },
                        {
                            icon: <BarsArrowDownIcon className={iconClass} />,
                            label: 'Descending',
                            onClick: () => changeSortDirection('DESC'),
                            selected: sortDirection === 'DESC'
                        }
                    ]}
                />
            </div>
            <div className="w-full flex flex-row justify-center mt-2">
                <p className="inline-block text-neutral-500 text-xs font-normal antialiased">
                    Displaying{' '}
                    <span className="font-medium">
                        {currentPage * resultsPerPage + 1} - {currentPage * resultsPerPage + currentPageTotal}
                    </span>{' '}
                    of <span className="font-medium">{totalResults}</span> results
                </p>
            </div>
        </div>
    )
}

export default Pagination
