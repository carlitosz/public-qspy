import React from 'react'

import SidebarHeader from '@/components/Layout/SidebarHeader'
import Menu from '@/components/Layout/Menu'

const Sidebar = (): JSX.Element => {
    return (
        <aside className="sidebar border-l-2 border-indigo-500 w-60 shadow-lg transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-gradient-to-b from-zinc-100 via-zinc-200 to-indigo-200">
            <SidebarHeader />
            <div className="sidebar-content px-4 py-6">
                <Menu />
            </div>
        </aside>
    )
}

export default Sidebar
