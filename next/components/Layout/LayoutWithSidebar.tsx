import React from 'react'
import Sidebar from './Sidebar'

import Main from '@/components/Layout/Main'

interface LayoutProps {
    children: React.ReactNode
}

const LayoutWithSidebar = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-row min-h-screen bg-gray-50 text-gray-900">
            <Sidebar />
            <Main>{children}</Main>
        </div>
    )
}

export default LayoutWithSidebar
