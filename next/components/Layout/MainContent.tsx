import React from 'react'

interface MainContentProps {
    children: React.ReactNode
}

const MainContent = ({ children }: MainContentProps): JSX.Element => {
    return (
        <main className="main flex flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
            {children}
        </main>
    )
}

export default MainContent
