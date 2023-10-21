import React, { useState } from 'react'
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon'

import DropdownMenuItem from '@/components/ApexChart/Toolbar/DropdownMenuItem'

import type { DropdownItem } from '@/components/ApexChart/Toolbar/DropdownMenuItem'

interface DropdownProps {
    menuItems: DropdownItem[]
}

const Dropdown = ({ menuItems }: DropdownProps): JSX.Element => {
    const [open, setOpen] = useState<boolean>(false)

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                onBlur={() => setOpen(false)}
                type="button"
                className="p-1 active:bg-neutral-300 text-neutral-500 hover:text-indigo-600 hover:bg-neutral-200 transition duration-150 focus:outline-none ease-out hover:ease-in rounded-full"
                id="menu-button"
                aria-expanded="true"
                aria-haspopup="true"
            >
                <EllipsisVerticalIcon className="h-6 w-6" />
            </button>

            {open && (
                <div
                    className="absolute p-2 right-0 z-10 origin-top-right w-48 rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="flex flex-col" role="none">
                        {menuItems &&
                            menuItems.map(
                                ({ divider, label, icon, title }: DropdownItem, index: number): JSX.Element => {
                                    if (divider) {
                                        return <div className="h-1 w-full border-b" key={index} />
                                    }

                                    return (
                                        <DropdownMenuItem
                                            id={`menu-item-${index}`}
                                            icon={icon}
                                            role="menuitem"
                                            key={index}
                                            label={label}
                                            tabIndex={-1}
                                            title={title}
                                        />
                                    )
                                }
                            )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Dropdown
