import React, { FormEvent, useState } from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon'

interface FormElements extends HTMLFormControlsCollection {
    search: HTMLInputElement
}

interface SearchElement extends HTMLFormElement {
    readonly elements: FormElements
}

interface TableSearchFormProps {
    onSubmitHandler: (text: string) => void
    clearSearchHandler: () => void
}

const TableSearchForm = ({ clearSearchHandler, onSubmitHandler }: TableSearchFormProps): JSX.Element => {
    const [searchText, setSearchText] = useState<string>('')
    const [currentSearch, setCurrentSearch] = useState<{ value: string; searching: boolean }>({
        value: '',
        searching: false
    })

    return (
        <form
            aria-label="Search form"
            className="relative inline-flex w-full px-4 py-6"
            onSubmit={(e: FormEvent<SearchElement>) => {
                e.preventDefault()
                e.stopPropagation()

                onSubmitHandler(e.currentTarget.elements.search.value)
                setCurrentSearch({ value: e.currentTarget.elements.search.value, searching: true })
            }}
        >
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="absolute inset-y-6 rtl:inset-r-0 start-3 flex items-center ps-3 h-8">
                <MagnifyingGlassIcon className="icon-sm text-title" />
            </div>
            <input
                aria-label="Search input"
                className="block bg-disabled h-8 ps-10 text-sm text-title border-l border-l-border border-y border-y-border rounded-s-md w-80 focus:outline-none focus:bg-component disabled:text-text"
                id="search"
                name="search"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.stopPropagation()

                    // If the user is performing a search and they clear the input,
                    // they should see the 'reset' button. The user has to explicitly
                    // click the reset button to clear the search.
                    if (currentSearch.searching && e.currentTarget.value.length === 0) {
                        setSearchText(e.currentTarget.value)
                        setCurrentSearch({ value: currentSearch.value, searching: true })
                        return
                    }

                    // If the user is performing a search and the text changes,
                    // they should see the 'search' button again (i.e. the user wants
                    // to perform a new search)
                    if (currentSearch.searching) {
                        setCurrentSearch({ value: currentSearch.value, searching: false })
                    }

                    setSearchText(e.currentTarget.value)
                }}
                placeholder="Search"
                value={searchText}
                type="text"
            />
            {currentSearch.searching ? (
                <button
                    aria-label="Clear search"
                    className="button-sm button-input-form text-sm"
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent | KeyboardEvent>) => {
                        e.preventDefault()
                        e.stopPropagation()

                        clearSearchHandler()
                        setSearchText('')
                        setCurrentSearch({ value: '', searching: false })
                    }}
                >
                    Reset
                </button>
            ) : (
                <button
                    aria-label="Submit search"
                    aria-disabled={searchText.length === 0}
                    disabled={searchText.length === 0}
                    className="button-sm button-input-form text-sm"
                >
                    Search
                </button>
            )}
        </form>
    )
}

export default TableSearchForm
