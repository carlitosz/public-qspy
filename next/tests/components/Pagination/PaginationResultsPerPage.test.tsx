import '@testing-library/jest-dom'
import React from 'react'

import PaginationResultsPerPage from '@/components/Pagination/PaginationResultsPerPage'
import { render, screen, userEvent } from '@/test-config'

describe('<PaginationResultsPerPage />', () => {
    describe('Any number of results', () => {
        test('defaults to 10 results per page', async () => {
            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={jest.fn()}
                    totalResults={50}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Assert
            expect(screen.getByLabelText('10')).toHaveAttribute('aria-current', 'true')
            expect(screen.getByLabelText('20')).toHaveAttribute('aria-current', 'false')
            expect(screen.getByLabelText('30')).toHaveAttribute('aria-current', 'false')
            expect(screen.getByLabelText('All (50)')).toHaveAttribute('aria-current', 'false')
        })

        test('changes the number of results per page', async () => {
            const cb = jest.fn()

            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={cb}
                    totalResults={50}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Click on 30
            await userEvent.click(screen.getByLabelText('30'))

            // Assert
            expect(cb).toHaveBeenCalledTimes(1)
            expect(cb).toHaveBeenCalledWith(30)
        })
    })

    describe('When there are less than 10 results', () => {
        test('display all is the only element enabled', async () => {
            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={jest.fn()}
                    totalResults={5}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Assert
            expect(screen.getByLabelText('10')).toBeDisabled()
            expect(screen.getByLabelText('20')).toBeDisabled()
            expect(screen.getByLabelText('30')).toBeDisabled()
            expect(screen.getByLabelText('All (5)')).not.toBeDisabled()
        })
    })

    describe('When there are less than 20 results', () => {
        test('menu item 10 and all (18) are enabled', async () => {
            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={jest.fn()}
                    totalResults={18}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Assert
            expect(screen.getByLabelText('10')).not.toBeDisabled()
            expect(screen.getByLabelText('20')).toBeDisabled()
            expect(screen.getByLabelText('30')).toBeDisabled()
            expect(screen.getByLabelText('All (18)')).not.toBeDisabled()
        })
    })

    describe('When there are less than 30 results', () => {
        test('menu item 10, 20 and all (28) are enabled', async () => {
            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={jest.fn()}
                    totalResults={28}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Assert
            expect(screen.getByLabelText('10')).not.toBeDisabled()
            expect(screen.getByLabelText('20')).not.toBeDisabled()
            expect(screen.getByLabelText('30')).toBeDisabled()
            expect(screen.getByLabelText('All (28)')).not.toBeDisabled()
        })
    })

    describe('When there are more than 30 results', () => {
        test('all menu items are enabled', async () => {
            render(
                <PaginationResultsPerPage
                    dropdownDirection="down"
                    resultsPerPage={10}
                    updateResultsPerPage={jest.fn()}
                    totalResults={31}
                />
            )

            // Open the dropdown
            await userEvent.click(screen.getByLabelText('Open dropdown menu'))

            // Assert
            expect(screen.getByLabelText('10')).not.toBeDisabled()
            expect(screen.getByLabelText('20')).not.toBeDisabled()
            expect(screen.getByLabelText('30')).not.toBeDisabled()
            expect(screen.getByLabelText('All (31)')).not.toBeDisabled()
        })
    })
})
