import React from 'react'

interface ContainerProps {
    children: React.ReactNode
    mainTitle: string
}

const Container = ({ children, mainTitle }: ContainerProps): JSX.Element => {
    return (
        <div className="md:container md:mx-auto">
            <p className="text-md text-neutral-500 my-8">{mainTitle}</p>
            {children}
        </div>
    )
}

export default Container
