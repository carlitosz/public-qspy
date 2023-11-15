import React from 'react'

export interface TabProps {
    hash: string
    icon: React.ReactNode
    id: HTMLElement['id']
    label: string
    onClick: () => void
    selected: boolean
}

const Tab = ({ hash, icon, id, label, onClick, selected }: TabProps): JSX.Element => {
    return (
        <li className="tab" role="presentation">
            <button
                aria-controls={id}
                aria-selected={selected}
                className={selected ? 'selected' : ''}
                data-tabs-target={hash}
                id={id + '-tab'}
                onClick={onClick}
                role="tab"
                type="button"
            >
                {icon}
                {label}
            </button>
        </li>
    )
}

export default Tab
