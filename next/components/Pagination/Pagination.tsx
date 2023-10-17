import React from 'react'
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'

interface PaginationProps {
    startIndex: number
    endIndex: number
    total: number
    next: (currentPage: number) => void
    back: (currentPage: number) => void
}

const Pagination = ({ startIndex, endIndex, total, next, back }: PaginationProps): JSX.Element => {
    return (
        <div className="flex justify-between items-center">
            <p className="text-xs text-neutral-600 antialiased">
                Showing results <span className="font-bold">{startIndex}</span>
                {'-'}
                <span className="font-bold">{endIndex}</span> of <span className="font-bold">{total}</span> results
            </p>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <a
                    onClick={() => back(startIndex)}
                    className="relative inline-flex border items-center rounded-l-md px-2 py-2 text-indigo-600 cursor-pointer"
                >
                    <ChevronLeftIcon className="h-5 w-5" />
                    <span className="text-sm ml-3">Back</span>
                </a>
                <a
                    onClick={() => next(endIndex)}
                    className="relative inline-flex border items-center rounded-r-md px-2 py-2 text-indigo-600 cursor-pointer"
                >
                    <span className="text-sm mr-3">Next</span>
                    <ChevronRightIcon className="h-5 w-5" />
                </a>
            </nav>
        </div>
    )
}

export default Pagination
