import React from 'react'

const AnalyticsCardSkeleton = (): JSX.Element => {
    return (
        <div
            role="status"
            className="flex flex-col justify-center border border-extralight rounded-md p-6 bg-white h-full w-full"
        >
            <div className="w-full h-4 bg-extralight rounded-md" />
            <div className="w-1/3 h-14 bg-extralight rounded-md my-4" />
            <div className="w-full h-4 bg-extralight rounded-md" />
        </div>
    )
}

export default AnalyticsCardSkeleton
