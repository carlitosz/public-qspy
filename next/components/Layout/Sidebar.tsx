import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'

import Menu from '@/components/Layout/Menu'
import MenuItem from '@/components/Layout/MenuItem'

const Sidebar = (): JSX.Element => {
    return (
        <aside className="h-full w-16 border-r border-border bg-component">
            <div className="flex flex-col items-center h-full min-w-max">
                <div className="justify-start my-6">
                    <span className="text-primary text-lg font-extrabold uppercase py-5">QSPY</span>
                </div>
                <Menu>
                    <div className="flex flex-col h-full w-12 justify-start items-center">
                        <MenuItem href="/" icon={<HomeIcon className="icon-md" />} />
                    </div>
                    <div className="flex flex-col h-full w-12 justify-end">
                        <MenuItem href="/preferences" icon={<Cog6ToothIcon className="icon-md" />} />
                    </div>
                </Menu>
            </div>
        </aside>
    )
}

export default Sidebar
