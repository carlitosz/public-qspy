import '@testing-library/jest-dom'
import React from 'react'

import Page from '@/components/Page/Page'
import { render, screen } from '@/test-config'

describe('<Page />', () => {
    test('renders a page', () => {
        render(
            <Page heading="Page heading" title="Page title">
                <div>Page content</div>
            </Page>
        )

        expect(screen.getByRole('presentation')).toHaveTextContent('Daily overview')
        expect(screen.getByRole('presentation')).toHaveTextContent('Page heading')
        expect(screen.getByText('Page content')).toBeInTheDocument()
    })
})
