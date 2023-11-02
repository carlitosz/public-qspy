import React from 'react'

interface AnalyticsCardSkeletonProps {
    border: string
    borderRadius?: string
}

const AnalyticsCardSkeleton = ({ border, borderRadius }: AnalyticsCardSkeletonProps): JSX.Element => {
    return (
        <div
            role="status"
            className={`flex flex-col shadow-sm justify-center ${border} ${borderRadius} bg-neutral-50 p-4 w-1/4 h-full`}
        >
            <div className="w-1/3 h-1/6 bg-neutral-200 rounded-md" />
            <div className="w-1/3 h-1/3 bg-neutral-200 rounded-md my-4" />
            <div className="w-full h-1/6 bg-neutral-200 rounded-md" />
        </div>
    )
}

export default AnalyticsCardSkeleton
