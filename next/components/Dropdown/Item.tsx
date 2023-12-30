import React from 'react'

import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

export type DropdownItem = {
    disabled?: boolean
    heading?: boolean
    icon?: React.ReactElement
    label: string
    onClick: () => void
    selected?: boolean
}

const Item = ({ disabled, heading, icon, label, onClick, selected }: DropdownItem): JSX.Element => {
    if (heading) {
        return (
            <button aria-label={label} className="button-sm uppercase text-text font-semibold text-xs">
                {label}
            </button>
        )
    }

    return (
        <button
            aria-current={selected}
            aria-label={label}
            className="flex justify-between items-center button-sm button-menu-item"
            disabled={disabled}
            onClick={onClick}
            role="menuitem"
            tabIndex={-1}
        >
            {icon}
            {label}
            {selected && <CheckCircleIcon className="icon-sm text-primary" />}
        </button>
    )
}

export default Item
