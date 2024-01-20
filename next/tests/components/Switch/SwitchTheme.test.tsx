import '@testing-library/jest-dom'
import React from 'react'
import MoonIcon from '@heroicons/react/24/solid/MoonIcon'
import SunIcon from '@heroicons/react/24/solid/SunIcon'

import SwitchTheme from '@/components/Switch/SwitchTheme'
import { render, screen, userEvent } from '@/test-config'

describe('<SwitchTheme />', () => {
    test('unchecked by default (light theme)', () => {
        render(
            <SwitchTheme
                icons={{
                    checked: <MoonIcon className="icon-sm" />,
                    unchecked: <SunIcon className="icon-sm" />
                }}
            />
        )

        expect(screen.getByRole('switch')).not.toBeChecked()
        expect(screen.getByLabelText('Toggle to dark theme')).toBeInTheDocument()
    })

    test('toggles to dark theme on switch', async () => {
        render(
            <SwitchTheme
                icons={{
                    checked: <MoonIcon className="icon-sm" />,
                    unchecked: <SunIcon className="icon-sm" />
                }}
            />
        )

        await userEvent.click(screen.getByRole('switch'))

        expect(screen.getByRole('switch')).toBeChecked()
        expect(screen.getByLabelText('Toggle to light theme')).toBeInTheDocument()
    })
})
