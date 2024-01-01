import Pagino from 'pagino'
import React from 'react'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'
import EllipsisHorizontalIcon from '@heroicons/react/24/outline/EllipsisHorizontalIcon'

import PaginationItem from '@/components/Pagination/PaginationItem'

interface PaginationNavProps {
    currentPage: number
    goToPage: (desiredPage: number) => void
    pagino: Pagino
    totalNumberOfPages: number
}

const PaginationNav = ({ currentPage, goToPage, pagino, totalNumberOfPages }: PaginationNavProps): JSX.Element => {
    const pages: Pagino = pagino.getPages()

    const renderElement = (page: number | string): React.ReactNode => {
        switch (page) {
            case 'start-ellipsis':
                return (
                    <PaginationItem
                        ariaLabel="Start ellipsis"
                        ariaDisabled={true}
                        key={page}
                        onClick={() => {}}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={-1}
                    >
                        <EllipsisHorizontalIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'end-ellipsis':
                return (
                    <PaginationItem
                        ariaLabel="End ellipsis"
                        ariaDisabled={true}
                        key={page}
                        onClick={() => {}}
                        onKeyDown={() => {}}
                        role="button"
                        tabIndex={-1}
                    >
                        <EllipsisHorizontalIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'first':
                return (
                    <PaginationItem
                        ariaLabel="First page"
                        ariaDisabled={currentPage === 1}
                        key={page}
                        onClick={() => goToPage(0)}
                        onKeyDown={() => goToPage(0)}
                        role="button"
                        tabIndex={-1}
                    >
                        <ChevronDoubleLeftIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'previous':
                return (
                    <PaginationItem
                        ariaLabel="Previous page"
                        ariaDisabled={currentPage === 1}
                        key={page}
                        onClick={() => goToPage(pagino.page - 2)}
                        onKeyDown={() => goToPage(pagino.page - 2)}
                        role="button"
                        tabIndex={-1}
                    >
                        <ChevronLeftIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'next':
                return (
                    <PaginationItem
                        ariaLabel="Next page"
                        ariaDisabled={currentPage === totalNumberOfPages}
                        key={page}
                        onClick={() => goToPage(pagino.page)}
                        onKeyDown={() => goToPage(pagino.page)}
                        role="button"
                        tabIndex={-1}
                    >
                        <ChevronRightIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'last':
                return (
                    <PaginationItem
                        ariaDisabled={currentPage === totalNumberOfPages}
                        ariaLabel="Last page"
                        key={page}
                        onClick={() => goToPage(pagino.last().page - 1)}
                        onKeyDown={() => goToPage(pagino.last().page - 1)}
                        role="button"
                        tabIndex={-1}
                    >
                        <ChevronDoubleRightIcon className="icon-xs" />
                    </PaginationItem>
                )
            default:
                return (
                    <PaginationItem
                        ariaLabel={`Page ${page}`}
                        ariaDisabled={false}
                        key={page}
                        ariaCurrent={currentPage === (page as number)}
                        onClick={() => goToPage((page as number) - 1)}
                        onKeyDown={() => goToPage((page as number) - 1)}
                        role="button"
                        tabIndex={0}
                    >
                        {page}
                    </PaginationItem>
                )
        }
    }

    return (
        <nav className="relative" aria-label="Table Navigation" role="navigation">
            <ul>{pages.map((page: number | string) => renderElement(page))}</ul>
        </nav>
    )
}

export default PaginationNav
