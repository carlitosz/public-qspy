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
                className="bg-hover h-8 w-24 text-xs px-2 ring-1 ring-border text-text focus:outline-none rounded-s-md disabled:bg-hover/40 disabled:cursor-not-allowed focus:bg-component"
                disabled={disabled}
                name="goToPage"
                max={max}
                min={1}
                placeholder={disabled ? '' : 'Go to page'}
                required={true}
                type="number"
            />
            <button
                className="bg-component ring-1 ring-border rounded-e-md text-text text-sm h-8 px-2 hover:bg-component disabled:bg-hover/40 disabled:text-text/40 disabled:cursor-not-allowed"
                disabled={disabled}
                type="submit"
            >
                <MagnifyingGlassIcon className="icon-xs" />
            </button>
        </form>
    )
}

export default PaginationGoToPageForm
