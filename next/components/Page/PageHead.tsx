import React from 'react'
import Head from 'next/head'

interface HeadProps {
    title: string
}

const PageHead = ({ title }: HeadProps): JSX.Element => {
    return (
        <Head>
            <title>{`qspy | ${title}`}</title>
            <meta property="og:title" content={title} key="title" />
            <meta name="theme-color" content="#FFFFFF" />
            <meta key="viewport" name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
    )
}

export default PageHead
