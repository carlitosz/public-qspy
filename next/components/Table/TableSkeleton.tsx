import React from 'react'

const TableSkeleton = (): JSX.Element => {
    return (
        <div className="w-full animate-pulse">
            <div className="flex justify-between items-baseline mb-2 w-full">
                <div className="h-8 w-1/6 rounded-md bg-border" />
                <div className="flex justify-end w-1/2">
                    <div className="h-8 w-2/6 rounded-md bg-border" />
                    <div className="h-8 w-12 rounded-md bg-border ml-6" />
                    <div className="h-8 w-12 rounded-md bg-border ml-6" />
                </div>
            </div>
            <div className="table-container">
                <div className="px-4 py-6">
                    <div className="h-10 rounded-md bg-border w-1/5 p-4" />
                </div>
                <div className="space-y-4 p-4">
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                    <div className="h-10 bg-border rounded-md w-full"></div>
                </div>
            </div>
            <div className="flex justify-between items-baseline mt-2 w-full">
                <div className="h-8 w-1/6 rounded-md bg-border" />
                <div className="flex justify-end w-1/2">
                    <div className="h-8 w-2/6 rounded-md bg-border" />
                    <div className="h-8 w-12 rounded-md bg-border ml-6" />
                    <div className="h-8 w-12 rounded-md bg-border ml-6" />
                </div>
            </div>
        </div>
    )
}

export default TableSkeleton
