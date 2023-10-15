import React from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/outline/MagnifyingGlassIcon'

const SidebarHeader = (): JSX.Element => {
    return (
        <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex flex-row items-center">
                <MagnifyingGlassIcon className="w-6 h-6 text-indigo-600" />
                <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">QSPY</span>
            </div>
        </div>
    )
}

export default SidebarHeader
