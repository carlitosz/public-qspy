import '@testing-library/jest-dom'
import React from 'react'

import PaginationResults from '@/components/Pagination/PaginationResults'
import { render, screen } from '@/test-config'

describe('<PaginationResults />', () => {
    describe('when the user is searching', () => {
        test('displays search results', () => {
            render(
                <PaginationResults
                    currentPage={0}
                    currentPageSize={10}
                    resultsPerPage={10}
                    searchText="Hello world"
                    totalResults={10}
                />
            )

            expect(screen.getByLabelText('Search results').textContent).toBe('Showing 10 results for "Hello world"')
        })
    })

    describe('when the user is paginating', () => {
        test('displays pagination results', () => {
            render(<PaginationResults currentPage={0} currentPageSize={10} resultsPerPage={20} totalResults={10} />)

            expect(screen.getByLabelText('Pagination results').textContent).toBe('Showing 1 - 10 of 10 events')
        })
    })
})
