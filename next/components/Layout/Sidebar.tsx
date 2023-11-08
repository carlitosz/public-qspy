import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon'

import Menu from '@/components/Layout/Menu'
import MenuItem from '@/components/Layout/MenuItem'

const Sidebar = (): JSX.Element => {
    return (
        <aside className="sidebar w-20 h-screen shadow-md border-r border-extralight bg-white">
            <div className="flex flex-col items-center justify-center h-full">
                <span className="text-dark text-xl font-extrabold uppercase py-6">QSPY</span>
                <Menu>
                    <div className="flex flex-col h-full justify-start items-center">
                        <MenuItem href="/" icon={<HomeIcon className="sidebar-icon-md" />} label="Home" />
                        <MenuItem href="#" icon={<QueueListIcon className="sidebar-icon-md" />} label="Queues" />
                    </div>
                    <div className="flex flex-col h-auto justify-end">
                        <MenuItem href="#" icon={<Cog6ToothIcon className="sidebar-icon-md" />} label="Settings" />
                    </div>
                </Menu>
            </div>
        </aside>
    )
}

export default Sidebar
