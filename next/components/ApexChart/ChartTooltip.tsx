import React from 'react'

interface ChartTooltipProps {
    data: {
        x: any
        y: any
    }
}

const ChartTooltip = ({ data }: ChartTooltipProps): JSX.Element => {
    return (
        <div className="block rounded-md bg-white text-center">
            <div className="flex items-center justify-center border-b-2 border-neutral-100 p-2">
                <p className="ml-3 text-sm tracking-tight antialiased text-neutral-600">{data.x}</p>
            </div>
            <div className=" p-2">
                <p className="text-xl">{data.y}</p>
                <p className="text-sm tracking-tight antialiased text-neutral-600">Occurrences</p>
            </div>
        </div>
    )
}

export default ChartTooltip
