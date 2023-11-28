import React from 'react'

const AnalyticsCardSkeleton = (): JSX.Element => {
    return (
        <div role="status" className="ring-1 ring-border rounded-md bg-component h-full w-full p-4 animate-pulse">
            <div className="w-1/3 h-10 bg-border rounded-md" />
            <div className="flex justify-between items-center mt-4">
                <div className="w-2/3 h-4 bg-border rounded-md" />
                <div className="w-1/6 h-4 bg-border rounded-md" />
            </div>
        </div>
    )
}

export default AnalyticsCardSkeleton
