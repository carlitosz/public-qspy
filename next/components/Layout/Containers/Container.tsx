import React from 'react'

interface Container {
    title: string
    children: React.ReactNode
}

const Container = ({ children, title }: Container): JSX.Element => {
    return (
        <div className="main-content flex flex-col flex-grow bg-white p-6 sm:px-6 text-neutral-700 bg-neutral-50">
            <p className="py-3 my-3 font-semibold antialiased">Daily Analytics</p>

            <div className="p-3 border-b border rounded-t border-gray-200">
                <p className="font-semibold antialiased">{title}</p>
            </div>
            <div className="p-3 border-b border-l border-r border-gray-200">{children}</div>
        </div>
    )
}

export default Container
