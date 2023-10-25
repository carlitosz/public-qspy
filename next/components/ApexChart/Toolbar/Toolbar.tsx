import React from 'react'

import DropdownMenu from '@/components/ApexChart/Toolbar/DropdownMenu'

import type { DropdownItem } from '@/components/ApexChart/Toolbar/DropdownMenuItem'

interface ToolbarProps {
    closeIcon?: React.ReactNode
    dropdown: DropdownItem[]
    openIcon?: React.ReactNode
}

const Toolbar = ({ closeIcon, dropdown, openIcon }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            {dropdown && <DropdownMenu closeIcon={closeIcon} menuItems={dropdown} openIcon={openIcon} />}
        </div>
    )
}

export default Toolbar
