import React from 'react'

import Dropdown from '@/components/Dropdown/Dropdown'

import type { DropdownItemType } from '@/components/Dropdown/DropdownItem'
import type { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface ToolbarProps {
    closeIcon?: React.ReactNode
    direction: DropdownDirection
    disabled: boolean
    items: DropdownItemType[]
    openIcon?: React.ReactNode
    title?: string
}

const Toolbar = ({ closeIcon, direction, disabled, items, openIcon, title }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            <Dropdown
                closeIcon={closeIcon}
                direction={direction}
                disabled={disabled}
                menuItems={items}
                openIcon={openIcon}
                title={title}
            />
        </div>
    )
}

export default Toolbar
