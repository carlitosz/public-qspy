import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'

import { Theme, useTheme } from '@/util/theme'

interface LayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [themeLoaded, setThemeLoaded] = useState<boolean>(false)
    const theme: Theme = useTheme()

    useEffect(() => setThemeLoaded(true), [theme])

    if (themeLoaded === false) {
        return <></>
    }

    return (
        <div className="flex flex-row h-screen w-screen bg-page">
            <Sidebar />
            <main className="flex flex-grow h-full w-full overflow-y-scroll -ml-64 md:ml-0">{children}</main>
        </div>
    )
}

export default Layout
