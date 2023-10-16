import React from 'react'

interface MainProps {
    children: React.ReactNode
}

const Main = ({ children }: MainProps): JSX.Element => {
    return (
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
            {children}
        </main>
    )
}

export default Main
