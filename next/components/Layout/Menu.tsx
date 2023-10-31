import React from 'react'
import HomeIcon from '@heroicons/react/24/outline/HomeIcon'
import ChartBarSquareIcon from '@heroicons/react/24/outline/ChartBarSquareIcon'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'

import MenuItem from '@/components/Layout/MenuItem'
import SubMenu from '@/components/Layout/SubMenu'

const Menu = (): JSX.Element => {
    return (
        <ul className="flex flex-col w-full">
            <MenuItem icon={<HomeIcon className="h-8 w-8 text-indigo-600 border-b" />} href="#" />
        </ul>
    )
}

export default Menu
