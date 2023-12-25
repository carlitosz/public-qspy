import Pagino from 'pagino'
import React, { useState, useMemo, FormEvent } from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'
import EllipsisHorizontalIcon from '@heroicons/react/24/outline/EllipsisHorizontalIcon'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'

import Dropdown from '@/components/Dropdown/Dropdown'
import PaginationItem from '@/components/Pagination/PaginationItem'

import type { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface FormElements extends HTMLFormControlsCollection {
    goToPage: HTMLInputElement
}

interface GoToPageElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface PaginationProps {
    currentPage: number
    currentPageSize: number
    dropdownDirection: DropdownDirection
    goToPage: (desiredPage: number) => void
    numPages: number
    resultsPerPage: number
    searchTerm: string
    setResultsPerPage: (desiredResults: number) => void
    totalResults: number
}

const Pagination = ({
    currentPage,
    currentPageSize,
    dropdownDirection,
    goToPage,
    numPages,
    resultsPerPage,
    searchTerm,
    setResultsPerPage,
    totalResults
}: PaginationProps): JSX.Element => {
    const [pages, setPages] = useState<Array<number | string>>([])

    const pagino: Pagino = useMemo(() => {
        const _: Pagino = new Pagino({
            onChange: () => setPages(_.getPages()),
            boundaryCount: 2
        })

        _.setCount(numPages)
        _.setPage(currentPage)

        return _
    }, [numPages, currentPage])

    const ChevronDown = <ChevronDownIcon className="icon-xs mr-1" />
    const ChevronUp = <ChevronUpIcon className="icon-xs mr-1" />

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
                        tabIndex={0}
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
                        tabIndex={0}
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
                        tabIndex={0}
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
                        tabIndex={0}
                    >
                        <ChevronLeftIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'next':
                return (
                    <PaginationItem
                        ariaLabel="Next page"
                        ariaDisabled={currentPage === numPages}
                        key={page}
                        onClick={() => goToPage(pagino.page)}
                        onKeyDown={() => goToPage(pagino.page)}
                        role="button"
                        tabIndex={0}
                    >
                        <ChevronRightIcon className="icon-xs" />
                    </PaginationItem>
                )
            case 'last':
                return (
                    <PaginationItem
                        ariaDisabled={currentPage === numPages}
                        ariaLabel="Last page"
                        key={page}
                        onClick={() => goToPage(pagino.last().page - 1)}
                        onKeyDown={() => goToPage(pagino.last().page - 1)}
                        role="button"
                        tabIndex={pages.length}
                    >
                        <ChevronDoubleRightIcon className="icon-xs" />
                    </PaginationItem>
                )
            default:
                return (
                    <PaginationItem
                        ariaLabel="Page"
                        ariaDisabled={false}
                        key={page}
                        ariaCurrent={currentPage === (page as number)}
                        onClick={() => goToPage((page as number) - 1)}
                        onKeyDown={() => goToPage((page as number) - 1)}
                        role="button"
                        tabIndex={(page as number) - 1}
                    >
                        {page}
                    </PaginationItem>
                )
        }
    }

    const paginationResults = `${
        (pagino.page - 1) * resultsPerPage + 1 - (pagino.page - 1) * resultsPerPage + currentPageSize
    }`

    return (
        <div className="pagination">
            <div className="summary">
                <span className="text-sm text-title antialiased">
                    Showing{' '}
                    <span className="font-semibold text-primary">
                        {searchTerm.length > 0 ? `${totalResults}` : `${paginationResults} of ${totalResults}`}
                    </span>{' '}
                    {searchTerm.length > 0 ? `search results for "${searchTerm}"` : ` events`}
                </span>
            </div>
            <div className="flex">
                <nav aria-label="Table Navigation" role="navigation">
                    <ul className="navigation-numbers">{pages.map((page: number | string) => renderElement(page))}</ul>
                </nav>
                <div className="results-per-page">
                    <Dropdown
                        closeIcon={dropdownDirection === 'up' ? ChevronUp : ChevronDown}
                        direction={dropdownDirection}
                        disabled={false}
                        menuItems={[
                            { title: 'Results per page' },
                            {
                                disabled: totalResults < 10,
                                label: 10,
                                onClick: () => setResultsPerPage(10),
                                selected: resultsPerPage === 10
                            },
                            {
                                disabled: totalResults < 20,
                                label: 20,
                                onClick: () => setResultsPerPage(20),
                                selected: resultsPerPage === 20
                            },
                            {
                                disabled: totalResults < 30,
                                label: 30,
                                onClick: () => setResultsPerPage(30),
                                selected: resultsPerPage === 30
                            },
                            {
                                label: `All (${totalResults})`,
                                onClick: () => setResultsPerPage(totalResults),
                                selected: resultsPerPage === totalResults
                            }
                        ]}
                        openIcon={dropdownDirection === 'up' ? ChevronUp : ChevronDown}
                        title={`${resultsPerPage}`}
                    />
                </div>
                <form
                    className="inline-flex h-8 relative"
                    onSubmit={(e: FormEvent<GoToPageElement>) => {
                        e.preventDefault()
                        goToPage(parseInt(e.currentTarget.elements.goToPage.value) - 1)
                        e.currentTarget.elements.goToPage.value = ''
                    }}
                >
                    <label htmlFor="goToPage" className="sr-only">
                        Go to page
                    </label>
                    <input
                        aria-label="Go to page"
                        aria-required={true}
                        className="bg-hover/30 h-8 w-24 text-xs px-2 ml-2 ring-1 ring-border text-text focus:outline-none rounded-s-md disabled:bg-hover/40 disabled:cursor-not-allowed focus:bg-component"
                        disabled={numPages <= 1}
                        name="goToPage"
                        max={numPages}
                        min={1}
                        placeholder={numPages <= 1 ? '' : 'Go to page'}
                        required={true}
                        type="number"
                    />
                    <button
                        className="bg-component ring-1 ring-border rounded-e-md text-text text-sm h-8 px-2 hover:bg-component disabled:bg-hover/40 disabled:text-text/40 disabled:cursor-not-allowed"
                        disabled={numPages <= 1}
                        type="submit"
                    >
                        <MagnifyingGlassIcon className="icon-xs" />
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Pagination
