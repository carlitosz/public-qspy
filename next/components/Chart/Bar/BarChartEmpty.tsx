import React from 'react'
import FaceFrownIcon from '@heroicons/react/24/outline/FaceFrownIcon'
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon'

const BarChartEmpty = (): JSX.Element => {
    return (
        <>
            <div className="h-1/2 text-neutral-400">
                <div className="flex flex-col h-full items-center justify-center">
                    <div className="inline-flex justify-center">
                        <FaceFrownIcon className="icon-lg" />
                        <FaceSmileIcon className="icon-lg" />
                    </div>
                    <p className="text-3xl font-medium my-10">No data available</p>
                    <p className="text-normal font-normal">The queue is empty or has not been processed</p>
                </div>
            </div>
            <div className="h-1/2 text-neutral-400 p-4">
                <div className="flex inline-flex items-end space-x-2 w-full h-full">
                    <div className="w-36 h-96 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-24 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-56 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-36 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-48 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-[32rem] bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-80 bg-border rounded-t-md dark:bg-neutral-700" />
                    <div className="w-36 h-72 bg-border rounded-t-md dark:bg-neutral-700" />
                </div>
            </div>
        </>
    )
}

export default BarChartEmpty
