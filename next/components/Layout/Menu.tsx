import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'

import MenuItem from '@/components/Layout/MenuItem'
import SubMenu from '@/components/Layout/SubMenu'

const Menu = (): JSX.Element => {
    return (
        <ul className="flex flex-col w-full">
            <MenuItem icon={<HomeIcon className="h-5 w-5 text-indigo-600" />} label="Dashboard" href="#" />
            <SubMenu label="Sub Menu" />
            <MenuItem icon={<ChartBarSquareIcon className="h-5 w-5 text-indigo-600" />} label="Statistics" href="#" />
            <MenuItem icon={<ChartBarSquareIcon className="h-5 w-5 text-indigo-600" />} label="Numbers" href="#" />
            <SubMenu label="My Account" />
            <MenuItem icon={<UserCircleIcon className="h-5 w-5 text-indigo-600" />} label="Profile" href="#" />
        </ul>
    )
}

export default Menu
