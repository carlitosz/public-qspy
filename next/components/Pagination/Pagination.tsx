import React from 'react'
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/solid/ChevronDoubleLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/solid/ChevronDoubleRightIcon'

interface PaginationProps {
    currentPage: number
    goToPage: (desiredPage: number) => void
    numPages: number
}

const Pagination = ({ currentPage, goToPage, numPages }: PaginationProps): JSX.Element => {
    const pageNumbers = Array(numPages).fill('x', 0, numPages)
    const unselected = `text-sm font-medium leading-none cursor-pointer text-gray-500 hover:text-indigo-500 border-t-2 border-transparent hover:border-indigo-500 p-4`
    const selected = `text-sm font-medium leading-none cursor-pointer text-indigo-600 hover:text-gray-500 border-t-2 p-4 border-indigo-500`

    return (
        <div className="w-full flex items-center justify-center">
            <div
                className="flex items-center p-4 text-gray-600 hover:text-indigo-600 cursor-pointer"
                onClick={() => goToPage(0)}
                aria-hidden="true"
            >
                <ChevronDoubleLeftIcon className="h-4 w-4" />
            </div>
            <div
                className="flex items-center p-4 text-gray-600 hover:text-indigo-600 cursor-pointer"
                onClick={() => goToPage(currentPage - 1)}
                aria-hidden="true"
            >
                <ChevronLeftIcon className="h-4 w-4" />
            </div>
            <div className="sm:flex hidden">
                {pageNumbers.map((value: string, index: number) => (
                    <p
                        key={index}
                        className={currentPage === index ? selected : unselected}
                        onClick={() => goToPage(index)}
                        aria-hidden="true"
                    >
                        {index + 1}
                    </p>
                ))}
            </div>

            <div
                className="flex items-center p-4 text-gray-600 hover:text-indigo-600 cursor-pointer"
                onClick={() => goToPage(currentPage + 1)}
                aria-hidden="true"
            >
                <ChevronRightIcon className="h-4 w-4" />
            </div>
            <div
                className="flex items-center p-4 text-gray-600 hover:text-indigo-600 cursor-pointer"
                onClick={() => goToPage(numPages - 1)}
                aria-hidden="true"
            >
                <ChevronDoubleRightIcon className="h-4 w-4" />
            </div>
        </div>
    )
}

export default Pagination
