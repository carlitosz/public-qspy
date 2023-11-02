import React from 'react'

import CheckCircleIcon from '@heroicons/react/24/solid/CheckCircleIcon'

type DropdownItemHtmlProps = { id: string; role: string; tabIndex: number }
export type DropdownItem = {
    divider?: boolean
    icon?: React.ReactElement
    label?: string | number | React.ReactNode
    onClick?: () => void
    selected?: boolean
    title?: string | React.ReactNode
    titleColor?: string
}

const paddings = 'p-2'

const DropdownItem = ({
    id,
    icon,
    label,
    onClick,
    role,
    selected = false,
    tabIndex,
    title,
    titleColor
}: DropdownItem & DropdownItemHtmlProps): JSX.Element => {
    if (React.isValidElement(label)) {
        return (
            <li className={`inline flex items-center text-neutral-400 w-full cursor-auto ${paddings}`}>
                {icon && icon}
                {label}
            </li>
        )
    }

    if (title) {
        return (
            <li className={`inline flex items-center text-neutral-400 w-full cursor-auto ${paddings}`}>
                {icon && icon}
                <span className={`text-xs font-medium uppercase antialiased ${titleColor ?? ''}`}>{title}</span>
            </li>
        )
    }

    return (
        <li
            aria-hidden="true"
            className={`flex flex-row justify-between align-center items-center rounded text-neutral-700 bg-neutral-50 hover:text-indigo-600 hover:bg-neutral-200 w-full px-2 py-3 transition duration-150 ease-out hover:ease-in cursor-pointer`}
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
            {selected && <CheckCircleIcon className="h-5 w-5 text-indigo-600" />}
        </li>
    )
}

export default DropdownItem
