import React from 'react'

const AnalyticsCardSkeleton = (): JSX.Element => {
    return (
        <div role="status" className="card w-1/4">
            <div className="w-full h-6 bg-extralight rounded-md" />
            <div className="w-1/3 h-10 bg-extralight rounded-md my-4" />
            <div className="w-full h-6 bg-extralight rounded-md" />
        </div>
    )
}

export default AnalyticsCardSkeleton
