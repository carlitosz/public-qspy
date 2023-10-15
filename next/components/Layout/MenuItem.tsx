import React from 'react'

interface MenuItemProps {
    icon: React.ReactNode
    label: string
    href: string
}

const MenuItem = ({ icon, label, href }: MenuItemProps): JSX.Element => {
    return (
        <li className="my-px">
            <a href="#" className="flex flex-row items-center h-10 px-3 rounded-lg text-zinc-600">
                <span className="flex items-center justify-center text-lg text-gray-400">{icon}</span>
                <span className="ml-3">{label}</span>
            </a>
        </li>
    )
}

export default MenuItem
