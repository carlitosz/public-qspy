import React from 'react'

import type { AppProps } from 'next/app'

import LayoutWithSidebar from '@/components/Layout/LayoutWithSidebar'

import '@/styles/globals.sass'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <LayoutWithSidebar>
            <Component {...pageProps} />
        </LayoutWithSidebar>
    )
}
