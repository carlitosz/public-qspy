import React, { AriaAttributes, useEffect, useState } from 'react'
import { NextRouter, useRouter } from 'next/router'

interface SidebarItemProps {
    ariaLabel: AriaAttributes['aria-label']
    className: string
    href: HTMLAnchorElement['href']
    icon: React.ReactNode
}

const SidebarItem = ({ ariaLabel, className, href, icon }: SidebarItemProps): JSX.Element => {
    const router: NextRouter = useRouter()
    const [selected, setSelected] = useState<boolean>(false)

    useEffect(() => {
        setSelected(router.pathname === href)
    }, [href, router])

    return (
        <div className="flex flex-col items-center">
            <button
                aria-current={selected}
                aria-label={ariaLabel}
                className={className}
                onClick={() => router.push(href)}
                onKeyDown={() => router.push(href)}
                role="menuitem"
                tabIndex={0}
            >
                {icon}
            </button>
        </div>
    )
}

export default SidebarItem
