import '@testing-library/jest-dom'
import React from 'react'

import Layout from '@/components/Layout/Layout'
import { render, screen, userEvent } from '@/test-config'

jest.mock('next/router', () => ({
    useRouter() {
        return {
            route: '/',
            pathname: '',
            query: '',
            asPath: ''
        }
    }
}))

describe('<Layout />', () => {
    test('loads sidebar and main content', async () => {
        render(
            <Layout>
                <div>nice layout!</div>
            </Layout>
        )

        expect(screen.getByRole('main')).toBeInTheDocument()
        expect(screen.getByRole('main')).toHaveTextContent('nice layout!')

        // Sidebar
        expect(screen.getByRole('menubar')).toBeInTheDocument()

        // Theme switcher
        expect(screen.getByRole('switch')).toBeInTheDocument()

        // Light mode by default
        expect(screen.getByRole('switch')).not.toBeChecked()

        // Can switch theme
        await userEvent.click(screen.getByRole('switch'))
        expect(screen.getByRole('switch')).toBeChecked()
    })
})
