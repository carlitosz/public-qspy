import React from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <meta name="QSPY" />
                <meta charSet="utf-8" />
                <meta key="texthtml" content="text/html; charset=UTF-8" name="Content-Type" />
                <meta name="description" content="QSPY: The one and only deadletter-queue reader." />

                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
