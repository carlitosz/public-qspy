import React from 'react'

import DropdownMenu from '@/components/Dropdown/Dropdown'

import type { DropdownItem } from '@/components/Dropdown/DropdownItem'

interface ToolbarProps {
    closeIcon?: React.ReactNode
    disabled: boolean
    dropdown: DropdownItem[]
    openIcon?: React.ReactNode
}

const Toolbar = ({ closeIcon, disabled, dropdown, openIcon }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            {dropdown && (
                <DropdownMenu closeIcon={closeIcon} disabled={disabled} menuItems={dropdown} openIcon={openIcon} />
            )}
        </div>
    )
}

export default Toolbar
