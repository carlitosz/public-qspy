import React from 'react'

const ChartSkeleton = (): JSX.Element => {
    return (
        <div role="status" className="p-4 rounded animate-pulse md:p-4">
            <div className="flex flex-col items-baseline mt-4 space-y-4">
                <div className="w-1/2 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-2/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/4 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-2/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/4 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/2 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/4 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-1/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
                <div className="w-2/3 h-8 bg-gray-200 rounded-r-lg dark:bg-gray-700" />
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default ChartSkeleton
