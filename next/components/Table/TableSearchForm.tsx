import React, { FormEvent, useEffect, useState } from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon'
import XCircleIcon from '@heroicons/react/24/solid/XCircleIcon'

interface FormElements extends HTMLFormControlsCollection {
    search: HTMLInputElement
}

interface SearchElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface TableSearchFormProps {
    onSubmitHandler: (text: string) => void
}

const TableSearchForm = ({ onSubmitHandler }: TableSearchFormProps): JSX.Element => {
    const [searchText, setSearchText] = useState<string>('')

    useEffect(() => {
        if (searchText.length === 0) {
            onSubmitHandler('')
        }
    }, [searchText, onSubmitHandler])

    return (
        <form
            aria-label="Search form"
            className="relative inline-flex w-full px-4 py-6"
            onSubmit={(e: FormEvent<SearchElement>) => {
                e.preventDefault()
                setSearchText(e.currentTarget.elements.search.value)
                onSubmitHandler(e.currentTarget.elements.search.value)
            }}
        >
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="absolute inset-y-0 rtl:inset-r-0 start-3 flex items-center ps-3 cursor-pointer">
                {searchText.length === 0 ? (
                    <MagnifyingGlassIcon className="icon-sm text-title" />
                ) : (
                    <div className="h-fit cursor-pointer">
                        <XCircleIcon
                            className="icon-sm text-primary cursor-pointer"
                            onClick={() => {
                                onSubmitHandler('')
                                setSearchText('')
                            }}
                        />
                    </div>
                )}
            </div>
            <input
                aria-label="Search input"
                className="block h-8 ps-10 text-xs text-title ring-1 ring-border rounded-s-md w-80 bg-hover/30 focus:outline-none focus:bg-component"
                name="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchText(e.currentTarget.value)}
                placeholder="Search"
                value={searchText}
                type="text"
            />
            <button
                aria-label="Submit search"
                aria-disabled={searchText.length === 0}
                disabled={searchText.length === 0}
                className="bg-component ring-1 ring-border rounded-e-md text-primary text-sm h-8 px-2 hover:bg-component disabled:bg-hover/40 disabled:text-text/40 disabled:cursor-not-allowed"
            >
                Search
            </button>
        </form>
    )
}

export default TableSearchForm
