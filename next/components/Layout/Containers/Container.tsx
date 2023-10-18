import React from 'react'

interface Container {
    children: React.ReactNode
}

const Container = ({ children }: Container): JSX.Element => {
    return (
        <div className="main-content flex flex-col flex-grow p-12 bg-neutral-50">
            <div className="border border-gray-200 shadow-lg bg-neutral-100 p-4">{children}</div>
        </div>
    )
}

export default Container
