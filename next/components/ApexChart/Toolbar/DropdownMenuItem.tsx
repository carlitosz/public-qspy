import React from 'react'

type DropdownItemHtmlProps = { id: string; role: string; tabIndex: number }
export type DropdownItem = { divider?: boolean; icon?: React.ReactElement; label?: string; title?: string }

const paddings = 'px-2 py-3'

const DropdownMenuItem = ({
    id,
    icon,
    label,
    role,
    tabIndex,
    title
}: DropdownItem & DropdownItemHtmlProps): JSX.Element => {
    if (title) {
        return (
            <div className={`inline flex items-center text-neutral-400 w-full ${paddings}`}>
                {icon && icon}
                <span className="text-xs font-medium uppercase antialiased">{title}</span>
            </div>
        )
    }

    return (
        <button
            className={`inline flex items-center rounded text-neutral-600 bg-neutral-50 hover:text-indigo-600 hover:bg-neutral-200 w-full px-2 py-3 transition duration-150 ease-out hover:ease-in ${paddings}`}
            id={id}
            role={role}
            tabIndex={tabIndex}
        >
            {icon && icon}
            <span className="text-xs font-medium antialiased">{label && label}</span>
        </button>
    )
}

export default DropdownMenuItem
