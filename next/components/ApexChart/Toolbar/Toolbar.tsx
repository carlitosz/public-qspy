import React from 'react'

import ActionButton from '@/components/ApexChart/Toolbar/Button'
import DropdownMenu from '@/components/ApexChart/Toolbar/DropdownMenu'

import type { DropdownItem } from '@/components/ApexChart/Toolbar/DropdownMenuItem'

type Action = 'dropdown' | 'savepng' | 'savejpg' | 'savesvg'

interface ToolbarProps {
    actions: Action[]
    dropdown: DropdownItem[]
}

const Toolbar = ({ actions, dropdown }: ToolbarProps): JSX.Element => {
    return (
        <div className="inline-flex" role="group">
            {dropdown && <DropdownMenu menuItems={dropdown} />}
            {actions.map((action: string) => {
                switch (action) {
                    case 'savepng':
                        return <ActionButton text="png" />
                    case 'savejpg':
                        return <ActionButton text="jpg" />
                    case 'savesvg':
                        return <ActionButton text="svg" />
                    default:
                        return <></>
                }
            })}
        </div>
    )
}

export default Toolbar
