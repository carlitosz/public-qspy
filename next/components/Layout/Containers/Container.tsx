import React from 'react'

interface Container {
    children: React.ReactNode
    mainTitle: string
}

const Container = ({ children, mainTitle }: Container): JSX.Element => {
    return (
        <div className="md:container md:mx-auto">
            <p className="text-md text-neutral-500 border-b my-8">{mainTitle}</p>
            {children}
        </div>
    )
}

export default Container
