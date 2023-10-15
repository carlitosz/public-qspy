import React from 'react'
import Sidebar from './Sidebar'

interface LayoutProps {
    children: React.ReactNode
}

const LayoutWithSidebar = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-row min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />
            {children}
        </div>
    )
}

export default LayoutWithSidebar
