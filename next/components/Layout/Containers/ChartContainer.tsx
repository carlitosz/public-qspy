import React from 'react'

interface ChartContainerProps {
    children: React.ReactNode
    title: string
}

const ChartContainer = ({ children, title }: ChartContainerProps): JSX.Element => {
    return (
        <div className="border border-gray-200 rounded-xl shadow-lg bg-neutral-100 p-4">
            <p className="text-neutral-500 border-b border-gray-200 text-sm font-semibold antialiased pb-4">{title}</p>
            {children}
        </div>
    )
}

export default ChartContainer
