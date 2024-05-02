import React, { useEffect, useRef, useState } from 'react'

import Item from '@/components/Dropdown/DropdownItem'

import type { DropdownItemProps } from '@/components/Dropdown/DropdownItem'

export type DropdownDirection = 'up' | 'down'

interface DropdownProps {
    id: HTMLButtonElement['id']
    closeIcon?: React.ReactNode
    direction: DropdownDirection
    items: DropdownItemProps[]
    openIcon?: React.ReactNode
    title?: string
}

const Dropdown = ({ closeIcon, direction, id, items, openIcon, title }: DropdownProps): JSX.Element => {
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
        <div className="relative inline-block text-left" ref={menuRef}>
            <div>
                <button
                    aria-expanded={open}
                    aria-haspopup={open}
                    aria-label={`${open ? 'Close' : 'Open'} dropdown menu`}
                    className="inline-flex items-center gap-x-1.5 button-sm button-general rounded-md"
                    id={id}
                    onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                        e.preventDefault()
                        e.stopPropagation()
                        setOpen(!open)
                    }}
                    type="button"
                >
                    {title}
                    {open ? closeIcon : openIcon}
                </button>
            </div>

            {open && (
                <div
                    className="dropdown-menu space-y-1"
                    data-direction={direction}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby={id}
                    tabIndex={-1}
                >
                    {items.map((item: DropdownItemProps, i: number) => (
                        <Item
                            disabled={item.disabled}
                            heading={item.heading}
                            key={i}
                            label={item?.label}
                            onClick={item.onClick}
                            selected={item.selected}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown
