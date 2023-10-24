import React from 'react'

interface MenuItemProps {
    icon: React.ReactNode
    label: string
}

const MenuItem = ({ icon, label }: MenuItemProps): JSX.Element => {
    return (
        <li className="my-px">
            <a href="#" className="flex flex-row items-center h-10 px-3 rounded-lg">
                <span className="flex items-center justify-center">{icon}</span>
                <span className="ml-3 text-sm">{label}</span>
            </a>
        </li>
    )
}

export default MenuItem
