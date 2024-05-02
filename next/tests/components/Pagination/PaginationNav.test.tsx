import '@testing-library/jest-dom'
import Pagino from 'pagino'
import React from 'react'

import PaginationNav from '@/components/Pagination/PaginationNav'
import { render, screen, userEvent } from '@/test-config'

describe('<PaginationNav />', () => {
    describe('Any number of pages', () => {
        const pagino = new Pagino({ siblingCount: 0 })

        beforeEach(() => {
            pagino.setCount(5)
            pagino.setPage(0)
        })

        test('changes the page', async () => {
            const goToPage = jest.fn()

            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={goToPage}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            // Page 1 is selected
            expect(screen.getByLabelText('Page 1')).toHaveAttribute('aria-current', 'true')

            // Change the page
            await userEvent.click(screen.getByLabelText('Page 2'))

            // Assert
            expect(goToPage).toHaveBeenCalledWith(1) // zero based indexing
        })

        test('disables "first page" and "previous page" if on page 1', () => {
            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={() => {}}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            expect(screen.getByLabelText('First page')).toHaveAttribute('aria-disabled', 'true')
            expect(screen.getByLabelText('Previous page')).toHaveAttribute('aria-disabled', 'true')
        })

        test('disables "last page" and "next page" if on last page', () => {
            render(
                <PaginationNav
                    currentPage={pagino.getPages().length} // last page
                    goToPage={() => {}}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            expect(screen.getByLabelText('Last page')).toHaveAttribute('aria-disabled', 'true')
            expect(screen.getByLabelText('Next page')).toHaveAttribute('aria-disabled', 'true')
        })

        test('goes to last page', async () => {
            const goToPage = jest.fn()

            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={goToPage}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            await userEvent.click(screen.getByLabelText('Last page'))

            expect(goToPage).toHaveBeenCalledTimes(1)
            expect(goToPage).toHaveBeenCalledWith(4) // zero-based indexing
        })

        test('goes to first page', async () => {
            const goToPage = jest.fn()

            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={goToPage}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            await userEvent.click(screen.getByLabelText('First page'))

            expect(goToPage).toHaveBeenCalledTimes(1)
            expect(goToPage).toHaveBeenCalledWith(0) // zero-based indexing
        })
    })

    describe('When there are 5 pages or less', () => {
        const pagino = new Pagino({ siblingCount: 0 })
        pagino.setCount(5)
        pagino.setPage(0)

        test('renders all page numbers', () => {
            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={jest.fn()}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            expect(screen.getByLabelText('Pagination navigation')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 2')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 3')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 4')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 5')).toBeInTheDocument()
        })
    })

    describe('When there are more than 5 pages', () => {
        const pagino = new Pagino({ siblingCount: 0 })
        pagino.setCount(10)
        pagino.setPage(0)

        test('it renders the first three page numbers and the last page number', () => {
            render(
                <PaginationNav
                    currentPage={1}
                    goToPage={jest.fn()}
                    pagino={pagino}
                    totalNumberOfPages={pagino.getPages().length}
                />
            )

            expect(screen.getByLabelText('Page 1')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 2')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 3')).toBeInTheDocument()
            expect(screen.getByLabelText('End ellipsis')).toBeInTheDocument()
            expect(screen.getByLabelText('Page 10')).toBeInTheDocument()
        })
    })
})
