import React from 'react'

interface ContainerProps {
    children: React.ReactNode
    mainTitle: string
}

const Container = ({ children, mainTitle }: ContainerProps): JSX.Element => {
    return (
        <div className="md:container md:mx-auto">
            <div className="flex flex-col justify-start py-4">
                <p className="text-sm text-indigo-600 antialiased">Overview</p>
                <p className="text-xl text-neutral-700 font-semibold antialiased">{mainTitle}</p>
            </div>
            {children}
        </div>
    )
}

export default Container
