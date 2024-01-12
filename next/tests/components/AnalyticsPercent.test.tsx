import '@testing-library/jest-dom'
import React from 'react'

import AnalyticsPercent from '@/components/Analytics/AnalyticsPercent'
import { render, screen } from '@testing-library/react'

test('displays neutral component if percent is equal to zero', async () => {
    render(<AnalyticsPercent percent={0} />)

    expect(screen.getByRole('status')).toHaveTextContent('0%')
    expect(screen.getByRole('status')).toHaveClass('pill solid neutral')
})

test('displays danger component if percent is less than zero', async () => {
    render(<AnalyticsPercent percent={-25} />)

    expect(screen.getByRole('status')).toHaveTextContent('25%')
})
