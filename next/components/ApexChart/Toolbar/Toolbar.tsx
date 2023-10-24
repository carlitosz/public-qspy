import React from 'react'

import DropdownMenu from '@/components/ApexChart/Toolbar/DropdownMenu'

import type { DropdownItem } from '@/components/ApexChart/Toolbar/DropdownMenuItem'

interface ToolbarProps {
    dropdown: DropdownItem[]
}

const Toolbar = ({ dropdown }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            {dropdown && <DropdownMenu menuItems={dropdown} />}
        </div>
    )
}

export default Toolbar
