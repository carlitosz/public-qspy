import React, { useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

export interface MenuItemProps {
    href: string
    icon: React.ReactNode
    label?: string
}

const MenuItem = ({ href, icon, label }: MenuItemProps): JSX.Element => {
    const router: NextRouter = useRouter()
    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        setSelected(router.pathname === href)
    }, [href, router])

    return (
        <li aria-hidden="true" className={`menu-item ${selected ? 'selected' : ''}`} onClick={() => router.push(href)}>
            {icon}
            {label && <span className="text-xs uppercase">{label}</span>}
        </li>
    )
}

export default MenuItem
