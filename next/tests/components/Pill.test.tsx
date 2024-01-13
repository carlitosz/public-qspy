import '@testing-library/jest-dom'
import React from 'react'

import Pill, { PillProps } from '@/components/Pill/Pill'
import { render, screen } from '@/test-utils'
import ArrowsRightLeftIcon from '@heroicons/react/24/outline/ArrowsRightLeftIcon'
import ArrowLongDownIcon from '@heroicons/react/24/outline/ArrowLongDownIcon'

describe('<AnalyticsPercent />', () => {
    test.each([
        {
            color: 'danger' as PillProps['color'],
            icon: <ArrowsRightLeftIcon data-testid="test-icon" />,
            label: '0%',
            style: 'solid' as PillProps['style']
        },
        {
            color: 'success' as PillProps['color'],
            icon: <ArrowLongDownIcon data-testid="test-icon" />,
            label: '-5%',
            style: 'outline' as PillProps['style']
        }
    ])('renders a Pill component', ({ color, icon, label, style }) => {
        render(<Pill color={color} icon={icon} label={label} style={style} />)

        expect(screen.getByRole('status')).toHaveTextContent(label)
        expect(screen.getByRole('status')).toHaveClass(style as string)
        expect(screen.getByRole('status')).toHaveClass(color as string)
        expect(screen.getByTestId('test-icon')).toBeInTheDocument()
    })

    test.each([{ label: '10%' }])('renders a Pill component with required and default props', ({ label }) => {
        render(<Pill label={label} />)

        expect(screen.getByRole('status')).toHaveTextContent(label)
        expect(screen.getByRole('status')).toHaveClass('neutral')
        expect(screen.getByRole('status')).toHaveClass('none')
    })
})
