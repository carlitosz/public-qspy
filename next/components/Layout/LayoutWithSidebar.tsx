import React from 'react'
import Sidebar from './Sidebar'

import Main from '@/components/Layout/Main'

interface LayoutProps {
    children: React.ReactNode
}

const LayoutWithSidebar = ({ children }: LayoutProps): JSX.Element => {
    return (
        <div className="flex flex-row min-h-screen bg-neutral-50">
            <Sidebar />
            <Main>{children}</Main>
        </div>
    )
}

export default LayoutWithSidebar
