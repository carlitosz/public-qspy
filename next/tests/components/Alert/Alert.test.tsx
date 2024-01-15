import '@testing-library/jest-dom'
import React from 'react'

import Alert, { AlertType } from '@/components/Alert/Alert'
import { render, screen } from '@/test-config'

describe('<Alert />', () => {
    test.each([
        { message: 'Hello', title: 'Error', type: 'danger' as AlertType },
        { message: 'World', title: 'Oops', type: 'success' as AlertType }
    ])('renders an alert', ({ message, title, type }) => {
        render(<Alert message={message} title={title} type={type} />)

        expect(screen.getByRole('alert')).toHaveClass(`border-${type}`)
        expect(screen.getByRole('alert')).toHaveTextContent(message)
        expect(screen.getByRole('alert')).toHaveTextContent(title)
    })
})
