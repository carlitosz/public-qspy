import React from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

const LayoutWithSidebar = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-row h-screen bg-superlight">
            <Sidebar />
            <main className="flex flex-grow h-screen w-screen overflow-y-scroll -ml-64 md:ml-0">{children}</main>
        </div>
    )
}

export default LayoutWithSidebar
