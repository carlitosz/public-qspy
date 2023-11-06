import React, { useEffect, useRef, useState } from 'react'
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon'
import XMarkIcon from '@heroicons/react/24/solid/XMarkIcon'

import DropdownMenuItem from '@/components/Dropdown/DropdownItem'

import type { DropdownItem } from '@/components/Dropdown/DropdownItem'

interface DropdownProps {
    closeIcon?: React.ReactNode
    disabled: boolean
    menuItems: DropdownItem[]
    openIcon?: React.ReactNode
}

const Dropdown = ({ closeIcon, disabled, menuItems, openIcon }: DropdownProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        document.addEventListener('click', toggleMenu)

        return () => {
            document.removeEventListener('click', toggleMenu)
        }
    })

    const toggleMenu = (e: MouseEvent | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { current } = menuRef

        if (e.target instanceof HTMLElement && e.target !== current) {
            if (current && !current.contains(e.target)) {
                setOpen(false)
            } else {
                setOpen(!open)
            }
        }
    }

    return (
        <div
            aria-hidden={true}
            className="relative inline-block rounded-full"
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setOpen(!open)
            }}
            ref={menuRef}
        >
            <button
                className={`${
                    open ? 'bg-extralight' : ''
                } p-2 text-dark hover:text-primary hover:bg-extralight transition duration-150 ease-out hover:ease-in rounded-full ${
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer'
                }`}
                id="menu-button"
                type="button"
                disabled={disabled}
            >
                {open
                    ? closeIcon ?? <XMarkIcon className="icon-sm animate-wiggle transform-gpu" />
                    : openIcon ?? <EllipsisVerticalIcon className="icon-sm animate-wiggle transform-gpu" />}
            </button>

            {open && (
                <div
                    className="absolute p-2 right-0 z-10 origin-top-right w-48 rounded-md bg-white shadow-lg ring-1 ring-extralight"
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
                                        return <div className="h-1 w-full border-b px-2 mb-2" key={index} />
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
