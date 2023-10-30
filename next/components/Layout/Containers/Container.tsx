import React from 'react'

interface ContainerProps {
    children: React.ReactNode
    mainTitle: string
}

const Container = ({ children, mainTitle }: ContainerProps): JSX.Element => {
    return (
        <div className="md:container mx-auto">
            <div className="flex flex-col w-full justify-start py-6">
                <p className="text-sm text-indigo-600 antialiased">Overview</p>
                <p className="text-xl text-neutral-700 font-semibold antialiased">{mainTitle}</p>
            </div>
            {children}
        </div>
    )
}

export default Container
