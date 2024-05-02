import React from 'react'

import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

export type DropdownItemProps = {
    disabled?: boolean
    heading?: boolean
    icon?: React.ReactElement
    label: string
    onClick: () => void
    selected?: boolean
}

const DropdownItem = ({ disabled, heading, icon, label, onClick, selected }: DropdownItemProps): JSX.Element => {
    if (heading) {
        return (
            <button
                aria-label={label}
                className="button-sm uppercase text-text font-semibold text-xs w-full"
                type="button"
            >
                {label}
            </button>
        )
    }

    return (
        <button
            aria-current={selected}
            aria-label={label}
            className="flex justify-between items-center button-sm button-menu-item w-full"
            disabled={disabled}
            onClick={onClick}
            role="menuitem"
            tabIndex={-1}
            type="button"
        >
            {icon}
            {label}
            {selected && <CheckCircleIcon className="icon-sm text-primary" />}
        </button>
    )
}

export default DropdownItem
