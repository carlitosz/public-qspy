import React from 'react'

import Dropdown from '@/components/Dropdown/Dropdown'

import type { DropdownItemType } from '@/components/Dropdown/DropdownItem'
import type { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface ToolbarProps {
    closeIcon?: React.ReactNode
    direction: DropdownDirection
    disabled: boolean
    dropdown: DropdownItemType[]
    openIcon?: React.ReactNode
}

const Toolbar = ({ closeIcon, direction, disabled, dropdown, openIcon }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            {dropdown && (
                <Dropdown
                    closeIcon={closeIcon}
                    direction={direction}
                    disabled={disabled}
                    menuItems={dropdown}
                    openIcon={openIcon}
                />
            )}
        </div>
    )
}

export default Toolbar
