import React from 'react'

interface PageProps {
    children: React.ReactNode
    heading: string
    title: string
}

const Page = ({ children, heading, title }: PageProps): JSX.Element => {
    return (
        <div className="lg:container mx-auto">
            <div className="my-6 h-12">
                <p className="text-primary text-sm antialiased">{title}</p>
                <p className="text-title text-lg font-semibold antialiased">{heading}</p>
            </div>
            {children}
        </div>
    )
}

export default Page
