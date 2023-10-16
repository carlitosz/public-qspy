import React from 'react'

const SidebarHeader = (): JSX.Element => {
    return (
        <div className="sidebar-header flex items-center justify-center py-4">
            <div className="inline-flex flex-row items-center">
                <span className="leading-10 text-zinc-700 text-2xl font-bold uppercase">QSPY</span>
            </div>
        </div>
    )
}

export default SidebarHeader
