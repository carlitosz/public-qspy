import React from 'react'

import type { AppProps } from 'next/app'

import Layout from '@/components/Layout/Layout'
import { ThemeProvider } from '@/utils/theme'

import '@/styles/globals.sass'

export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ThemeProvider>
    )
}
