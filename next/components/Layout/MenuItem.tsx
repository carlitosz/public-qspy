import React, { useEffect, useState } from 'react'
import Router from 'next/router'

export interface MenuItemProps {
    href: string
    icon: React.ReactNode
    label?: string
}

const MenuItem = ({ href, icon, label }: MenuItemProps): JSX.Element => {
    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => setSelected(Router.pathname === href), [href])

    return (
        <li aria-hidden="true" className={`menu-item ${selected ? 'selected' : ''}`} onClick={() => Router.push(href)}>
            {icon}
            {label && <span className="text-xs uppercase">{label}</span>}
        </li>
    )
}

export default MenuItem
