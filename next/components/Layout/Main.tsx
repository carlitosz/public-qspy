import React from 'react'

interface MainProps {
    children: React.ReactNode
}

const Main = ({ children }: MainProps): JSX.Element => {
    return (
        <main className="flex flex-grow h-screen overflow-y-scroll bg-neutral-100 -ml-64 md:ml-0 transition-all duration-150 ease-in">
            {children}
        </main>
    )
}

export default Main
