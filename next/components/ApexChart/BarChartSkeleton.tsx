import React from 'react'

import { Orientation } from 'types'

interface BarChartSkeletonProps {
    orientation: Orientation
}

const BarChartSkeleton = ({ orientation }: BarChartSkeletonProps): JSX.Element => {
    return (
        <div role="status" className="p-4 rounded animate-pulse border h-full">
            <div className="flex flex-row justify-between items-center border-b pb-4">
                <div className="w-1/3 h-4 bg-neutral-200 rounded-lg" />
                <div className="w-6 h-6 bg-neutral-200 rounded-full" />
            </div>

            <div className="flex flex-row justify-center items-center gap-2">
                <div className="w-96 h-8 rounded-lg bg-neutral-200" />
                <div className="w-6 h-6 bg-neutral-200 rounded-full" />
            </div>

            {orientation === 'horizontal' ? (
                <div className="flex flex-col items-baseline mt-4 space-y-2 h-full">
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                    <div className="w-48 h-4 bg-neutral-200 rounded-md dark:bg-neutral-700" />
                </div>
            ) : (
                <div className="flex inline-flex items-baseline space-x-2 w-full max-h-[32rem]">
                    <div className="w-36 h-[32rem] bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-[24rem] bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-36 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-[32rem] bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                </div>
            )}
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default BarChartSkeleton
