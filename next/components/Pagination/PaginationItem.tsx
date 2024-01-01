import React from 'react'

interface PaginationItemProps {
    ariaCurrent?: React.AriaAttributes['aria-current']
    ariaDisabled: React.AriaAttributes['aria-disabled']
    ariaLabel: React.AriaAttributes['aria-label']
    children: React.ReactNode | string | number
    onClick: () => void
    onKeyDown: () => void
    role: React.AriaRole
    tabIndex: HTMLAnchorElement['tabIndex']
}

const PaginationItem = ({
    ariaCurrent,
    ariaDisabled,
    ariaLabel,
    children,
    onClick,
    onKeyDown,
    role,
    tabIndex
}: PaginationItemProps): JSX.Element => {
    return (
        <li>
            <a
                aria-current={ariaCurrent}
                aria-disabled={ariaDisabled}
                aria-labelledby={ariaLabel}
                onClick={onClick}
                onKeyDown={onKeyDown}
                role={role}
                tabIndex={tabIndex}
            >
                <span className="sr-only">{ariaLabel}</span>
                {children}
            </a>
        </li>
    )
}

export default PaginationItem
