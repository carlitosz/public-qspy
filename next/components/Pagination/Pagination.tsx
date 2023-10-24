import React from 'react'
import ChevronLeftIcon from '@heroicons/react/24/solid/ChevronLeftIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/solid/ChevronDoubleLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/solid/ChevronRightIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/solid/ChevronDoubleRightIcon'

import PaginationItem from '@/components/Pagination/PaginationItem'

interface PaginationProps {
    currentPage: number
    currentPageTotal: number
    goToPage: (desiredPage: number) => void
    numPages: number
    totalResults: number
}

const iconClass = 'h-4 w-4'

const Pagination = ({
    currentPage,
    currentPageTotal,
    goToPage,
    numPages,
    totalResults
}: PaginationProps): JSX.Element => {
    const pageNumbers = Array(numPages).fill('x', 0, numPages)
    const unselected = `text-sm font-medium leading-none cursor-pointer text-neutral-500 hover:text-indigo-500 border-t-2 border-transparent hover:border-indigo-500 p-4 duration-150 ease-out hover:ease-in`
    const selected = `text-sm font-medium leading-none cursor-pointer text-indigo-600 hover:text-neutral-500 border-t-2 p-4 border-indigo-500 duration-150 ease-out hover:ease-in`

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
            </div>
            <div className="w-full flex flex-row justify-center mt-2">
                <p className="inline-block text-neutral-600 text-xs font-normal antialiased">
                    Displaying <span className="font-bold">{currentPageTotal}</span> of{' '}
                    <span className="font-bold">{totalResults}</span> results
                </p>
            </div>
        </div>
    )
}

export default Pagination
