import '@testing-library/jest-dom'
import React from 'react'

import AnalyticsCard from '@/components/Analytics/AnalyticsCard'
import { render, screen } from '@/test-config'

describe('<AnalyticsCard />', () => {
    test.each([
        { metric: 10, percentOfChange: 25, title: 'Total messages' },
        { metric: 0, title: 'New' },
        { metric: 0, title: 'Expired' },
        { metric: 18, percentOfChange: 0, title: 'Unique messages' }
    ])('renders an Analytics Card', ({ metric, percentOfChange, title }) => {
        render(<AnalyticsCard metric={metric} percentOfChange={percentOfChange} title={title} />)

        expect(screen.getByText(metric)).toBeInTheDocument()
        expect(screen.getByText(title)).toBeInTheDocument()

        if (percentOfChange) {
            expect(screen.getByRole('status')).toBeInTheDocument()
        }
    })
})
