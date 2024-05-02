import React, { FormEvent } from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'

interface PaginationGoToPageFormProps {
    disabled: boolean
    goToPage: (desiredPage: number) => void
    max: number
}

interface FormElements extends HTMLFormControlsCollection {
    goToPage: HTMLInputElement
}

interface GoToPageElement extends HTMLFormElement {
    readonly elements: FormElements
}

const PaginationGoToPageForm = ({ disabled, goToPage, max }: PaginationGoToPageFormProps): JSX.Element => {
    return (
        <form
            aria-label="Navigate to page form"
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
                aria-label="Go to page input"
                aria-required={true}
                className="bg-disabled h-8 w-24 text-sm px-2 ring-1 ring-border text-title focus:outline-none rounded-s-md disabled:bg-disabled disabled:cursor-not-allowed focus:bg-component"
                disabled={disabled}
                id="goToPage"
                name={`goToPage`}
                max={max}
                min={1}
                placeholder={disabled ? '' : 'Go to page'}
                required={true}
                type="number"
            />
            <button
                aria-label="Go to page button"
                className="bg-component ring-1 ring-border rounded-e-md text-text text-sm h-8 px-2 hover:bg-component disabled:bg-disabled disabled:text-text/40 disabled:cursor-not-allowed"
                disabled={disabled}
                type="submit"
            >
                <MagnifyingGlassIcon className="icon-xs" />
            </button>
        </form>
    )
}

export default PaginationGoToPageForm
