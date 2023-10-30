import React from 'react'

interface PaginationItemProps {
    icon?: React.ReactElement
    klass?: string
    onClick: () => void
    text?: string
}

const PaginationItem = ({ icon, klass, onClick, text }: PaginationItemProps): JSX.Element => {
    const defaultClass =
        'flex items-center p-4 text-neutral-600 hover:text-indigo-600 cursor-pointer transition duration-150 ease-out hover:ease-in'

    return (
        <div className={klass ? klass : defaultClass} onClick={onClick} aria-hidden="true">
            {icon && icon}
            {text && <span className="text-sm">{text}</span>}
        </div>
    )
}

export default PaginationItem
