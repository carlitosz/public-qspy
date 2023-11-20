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
        <li
            aria-hidden="true"
            className={`dropdown-item ${selected ? ' selected' : ''} ${disabled ? ' disabled' : ''}`}
            data-value={label}
            id={id}
            onClick={onClick}
            role={role}
            tabIndex={tabIndex}
        >
            <div className="inline-flex items-center">
                {icon && icon}
                <span className="text-xs font-medium antialiased">{label && label}</span>
            </div>
            {selected && <CheckCircleIcon className="icon-sm text-primary" />}
        </li>
    )
}

export default DropdownItem
