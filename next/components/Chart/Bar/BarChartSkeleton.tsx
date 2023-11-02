import React from 'react'

import { Orientation } from 'types'

interface BarChartSkeletonProps {
    orientation: Orientation
}

const BarChartSkeleton = ({ orientation }: BarChartSkeletonProps): JSX.Element => {
    return (
        <div className="animate-pulse h-full">
            <div className="flex flex-row justify-between items-center border-b px-4 py-2">
                <div className="w-1/3 h-4 bg-neutral-200 rounded-lg" />
                <div className="w-6 h-6 bg-neutral-200 rounded-full" />
            </div>

            <div className="flex flex-col align-center justify-center">
                <div className="flex flex-row justify-center items-center">
                    <div className="w-96 h-6 rounded-lg bg-neutral-200 mr-4" />
                    <div className="w-6 h-6 bg-neutral-200 rounded-full" />
                </div>
                <div className="w-full flex flex-row justify-center my-6">
                    <div className="inline-block text-neutral-500 text-xs font-normal antialiased">
                        <div className="w-72 h-2 bg-neutral-200 rounded-full" />
                    </div>
                </div>
            </div>

            {orientation === 'horizontal' ? (
                <div className="flex flex-col items-baseline space-y-2 h-full">
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
                <div className="flex flex-row items-end space-x-2 w-full h-full p-4">
                    <div className="w-36 h-96 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-24 bg-neutral-200 rounded-t-md dark:bg-neutral-700" />
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
