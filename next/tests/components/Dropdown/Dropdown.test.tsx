import '@testing-library/jest-dom'
import React from 'react'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'

import Dropdown from '@/components/Dropdown/Dropdown'
import { render, screen, userEvent } from '@/test-config'

describe('<Dropdown />', () => {
    test('items respond to clicks', async () => {
        const onClickCallback = jest.fn()

        render(
            <Dropdown
                closeIcon={<ChevronUpIcon data-testid="close-icon" className="icon-sm" />}
                openIcon={<ChevronDownIcon data-testid="open-icon" className="icon-sm" />}
                id="test-id"
                direction="down"
                items={[{ disabled: false, label: 'hello', onClick: onClickCallback, selected: false }]}
            />
        )

        await userEvent.click(screen.getByLabelText('Open dropdown menu'))
        await userEvent.click(screen.getByRole('menuitem'))

        expect(onClickCallback).toHaveBeenCalled()
    })

    test('displays item as selected', async () => {
        render(
            <Dropdown
                closeIcon={<ChevronUpIcon data-testid="close-icon" className="icon-sm" />}
                openIcon={<ChevronDownIcon data-testid="open-icon" className="icon-sm" />}
                id="test-id"
                direction="down"
                items={[{ disabled: false, label: 'hello', onClick: () => {}, selected: true }]}
            />
        )

        await userEvent.click(screen.getByLabelText('Open dropdown menu'))

        expect(screen.getByRole('menuitem')).toBeInTheDocument()
        expect(screen.getByRole('menuitem')).toHaveAttribute('aria-current', 'true')
    })

    test('disables items', async () => {
        render(
            <Dropdown
                closeIcon={<ChevronUpIcon data-testid="close-icon" className="icon-sm" />}
                openIcon={<ChevronDownIcon data-testid="open-icon" className="icon-sm" />}
                id="test-id"
                direction="down"
                items={[{ disabled: true, label: 'hello', onClick: () => {}, selected: false }]}
            />
        )

        await userEvent.click(screen.getByLabelText('Open dropdown menu'))

        expect(screen.getByRole('menuitem')).toBeDisabled()
    })
})
