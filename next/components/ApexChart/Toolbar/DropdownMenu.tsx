import React, { useEffect, useRef, useState } from 'react'
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import DropdownMenuItem from '@/components/ApexChart/Toolbar/DropdownMenuItem'

import type { DropdownItem } from '@/components/ApexChart/Toolbar/DropdownMenuItem'

interface DropdownProps {
    menuItems: DropdownItem[]
}

const iconClass = 'h-6 w-6 animate-wiggle'

const Dropdown = ({ menuItems }: DropdownProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLButtonElement>(null)

    const toggleMenu = (e) => {
        e.stopPropagation()
        e.preventDefault()

        const { current } = menuRef

        if (current && !current.contains(e.target)) {
            console.log(open)
            setOpen(false)
        } else {
            setOpen(!open)
        }
    }

    useEffect(() => {
        document.addEventListener('click', toggleMenu)

        return () => {
            document.removeEventListener('click', toggleMenu)
        }
    }, [])

    return (
        <div className="relative inline-block">
            <button
                aria-expanded="true"
                aria-haspopup="true"
                className={`${
                    open ? 'bg-neutral-200' : ''
                } p-1 text-neutral-500 hover:text-indigo-600 hover:bg-neutral-200 transition duration-150 focus:outline-none ease-out hover:ease-in rounded-full`}
                id="menu-button"
                onClick={toggleMenu}
                ref={menuRef}
                type="button"
            >
                {open ? <XMarkIcon className={iconClass} /> : <EllipsisVerticalIcon className={iconClass} />}
            </button>

            {open && (
                <div
                    className="absolute p-2 right-0 z-10 origin-top-right w-48 rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <ul className="flex flex-col" role="none">
                        {menuItems &&
                            menuItems.map(
                                (
                                    { divider, label, icon, onClick, selected, title }: DropdownItem,
                                    index: number
                                ): JSX.Element => {
                                    if (divider) {
                                        return <div className="h-1 w-full border-b" key={index} />
                                    }

                                    return (
                                        <DropdownMenuItem
                                            id={`menu-item-${index}`}
                                            icon={icon}
                                            onClick={onClick}
                                            role="menuitem"
                                            key={index}
                                            label={label}
                                            tabIndex={-1}
                                            title={title}
                                            selected={selected}
                                        />
                                    )
                                }
                            )}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default Dropdown
