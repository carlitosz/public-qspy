import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google'

import Sidebar from '@/components/Sidebar/Sidebar'

import { Theme, useTheme } from '@/utils/theme'

interface LayoutProps {
    children: React.ReactNode
}

const poppins = Poppins({
    subsets: ['latin'],
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})

const Layout = ({ children }: LayoutProps): JSX.Element => {
    const [themeLoaded, setThemeLoaded] = useState<boolean>(false)
    const theme: Theme = useTheme()

    useEffect(() => setThemeLoaded(true), [theme])

    if (themeLoaded === false) {
        return <></>
    }

    return (
        <div className={`${poppins.variable} font-sans flex flex-row h-screen w-screen bg-page`}>
            <Sidebar />
            <main className="flex flex-grow h-full w-full overflow-y-scroll -ml-64 md:ml-0">{children}</main>
        </div>
    )
}

export default Layout
