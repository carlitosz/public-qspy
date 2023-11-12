import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import QueueListIcon from '@heroicons/react/24/outline/QueueListIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'

import Menu from '@/components/Layout/Menu'
import MenuItem from '@/components/Layout/MenuItem'
import SwitchTheme from '@/components/Switch/SwitchTheme'

const Sidebar = (): JSX.Element => {
    return (
        <aside className="sidebar w-20 h-screen shadow-md border-r border-border bg-component">
            <div className="flex flex-col items-center justify-center h-full">
                <span className="text-primary text-xl font-extrabold uppercase py-5">QSPY</span>
                <Menu>
                    <div className="flex flex-col h-full justify-start items-center">
                        <MenuItem href="/" icon={<HomeIcon className="sidebar-icon-md" />} label="Home" />
                        <MenuItem href="#" icon={<QueueListIcon className="sidebar-icon-md" />} label="Queues" />
                    </div>
                    <div className="flex flex-col h-auto justify-end">
                        <SwitchTheme
                            icons={{
                                checked: <MoonIcon className="icon-sm" />,
                                unchecked: <SunIcon className="icon-sm" />
                            }}
                        />
                    </div>
                </Menu>
            </div>
        </aside>
    )
}

export default Sidebar
