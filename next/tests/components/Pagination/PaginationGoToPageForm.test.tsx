import '@testing-library/jest-dom'
import React from 'react'

import PaginationGoToPageForm from '@/components/Pagination/PaginationGoToPageForm'
import { render, screen, userEvent } from '@/test-config'

describe('<PaginationGoToPageForm />', () => {
    test('renders the form', async () => {
        render(<PaginationGoToPageForm disabled={false} goToPage={jest.fn()} max={10} />)

        expect(screen.getByLabelText('Navigate to page form')).toBeInTheDocument()
        expect(screen.getByLabelText('Go to page button')).toBeInTheDocument()
    })

    test('disables the form', async () => {
        render(<PaginationGoToPageForm disabled={true} goToPage={jest.fn()} max={10} />)

        expect(screen.getByLabelText('Go to page input')).toBeDisabled()
        expect(screen.getByLabelText('Go to page button')).toBeDisabled()
    })

    test('can navigate to another page', async () => {
        const callback = jest.fn()
        render(<PaginationGoToPageForm disabled={false} goToPage={callback} max={10} />)

        await userEvent.type(screen.getByPlaceholderText('Go to page'), '9')
        await userEvent.click(screen.getByLabelText('Go to page button'))

        expect(screen.getByPlaceholderText('Go to page')).toHaveTextContent('')
        expect(callback).toHaveBeenCalledWith(8) // zero-based indexing
    })

    test('cannot navigate past the max', async () => {
        const callback = jest.fn()
        render(<PaginationGoToPageForm disabled={false} goToPage={callback} max={10} />)

        await userEvent.type(screen.getByPlaceholderText('Go to page'), '12')
        await userEvent.click(screen.getByLabelText('Go to page button'))

        expect(screen.getByPlaceholderText('Go to page')).toHaveValue(12)
        expect(callback).not.toHaveBeenCalled()
    })

    test('cannot navigate below the min', async () => {
        const callback = jest.fn()
        render(<PaginationGoToPageForm disabled={false} goToPage={callback} max={10} />)

        await userEvent.type(screen.getByPlaceholderText('Go to page'), '-4')
        await userEvent.click(screen.getByLabelText('Go to page button'))

        expect(screen.getByPlaceholderText('Go to page')).toHaveValue(-4)
        expect(callback).not.toHaveBeenCalled()
    })
})
