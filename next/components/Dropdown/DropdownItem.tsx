import React from 'react'

import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

type DropdownItemHtmlProps = { id: string; role: string; tabIndex: number }
export type DropdownItemType = {
    disabled?: boolean
    divider?: boolean
    icon?: React.ReactElement
    label?: string | number | React.ReactNode
    onClick?: () => void
    selected?: boolean
    title?: string | React.ReactNode
}

const DropdownItem = ({
    disabled,
    id,
    icon,
    label,
    onClick,
    role,
    selected = false,
    tabIndex,
    title
}: DropdownItemType & DropdownItemHtmlProps): JSX.Element => {
    // Used in tooltip.tsx
    if (React.isValidElement(label)) {
        return (
            <li className="dropdown-label">
                {icon && icon}
                {label}
            </li>
        )
    }

    if (title) {
        return (
            <li className="dropdown-title">
                {icon && icon}
                <span className="text-xs font-medium uppercase antialiased">{title}</span>
            </li>
        )
    }

    return (
        <li>
            <a
                aria-disabled={disabled}
                aria-current={selected}
                className="dropdown-item"
                onClick={onClick}
                onKeyDown={onClick}
                role="menuitem"
                tabIndex={0}
            >
                {icon && icon}
                <span className="text-xs font-medium antialiased">{label && label}</span>
            </a>
            {selected && <CheckCircleIcon className="icon-sm text-primary" />}
        </li>
    )
}

export default DropdownItem
