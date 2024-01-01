import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import MoonIcon from '@heroicons/react/24/solid/MoonIcon'
import SunIcon from '@heroicons/react/24/solid/SunIcon'

import SidebarItem from '@/components/Sidebar/SidebarItem'
import SwitchTheme from '@/components/Switch/SwitchTheme'

const Sidebar = (): JSX.Element => {
    return (
        <div
            className="flex flex-col items-center justify-between w-20 h-full py-4 overflow-hidden fixed bg-component text-title"
            role="menubar"
        >
            <div className="h-fit w-fit">
                <SidebarItem
                    ariaLabel="Go to homepage"
                    className="button-sidebar-item"
                    href="/"
                    icon={<HomeIcon className="icon-md" />}
                />
            </div>
            <SidebarItem
                ariaLabel="Go to homepage"
                className="button-sidebar"
                href="/"
                icon={
                    <SwitchTheme
                        icons={{
                            checked: <MoonIcon className="icon-sm" />,
                            unchecked: <SunIcon className="icon-sm" />
                        }}
                    />
                }
            />
        </div>
    )
}

export default Sidebar
