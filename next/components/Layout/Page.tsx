import React from 'react'

import PageHead from '@/components/Layout/PageHead'

interface PageProps {
    children: React.ReactNode
    heading: string
    title: string
}

const Page = ({ children, heading, title }: PageProps): JSX.Element => {
    return (
        <>
            <PageHead title={title} />
            <div className="lg:container mx-auto py-2">
                <div className="my-4 h-8">
                    <p className="text-title text-lg font-semibold antialiased">{heading}</p>
                </div>
                {children}
            </div>
        </>
    )
}

export default Page
