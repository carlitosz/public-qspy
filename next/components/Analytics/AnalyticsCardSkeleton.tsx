import React from 'react'

interface AnalyticsCardSkeletonProps {
    borderRadius?: string
}

const AnalyticsCardSkeleton = ({ borderRadius }: AnalyticsCardSkeletonProps): JSX.Element => {
    return (
        <div
            role="status"
            className={`flex flex-col border border-neutral-200 ${borderRadius} bg-neutral-50 p-6 w-1/4 h-full`}
        >
            <div className="w-1/3 h-1/4 bg-neutral-200 rounded-md" />
            <div className="w-1/2 h-1/2 bg-neutral-200 rounded-md my-4" />
            <div className="w-full h-1/4 bg-neutral-200 rounded-md" />
        </div>
    )
}

export default AnalyticsCardSkeleton
