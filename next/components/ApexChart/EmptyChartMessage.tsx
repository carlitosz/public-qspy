import React from 'react'
import FaceFrownIcon from '@heroicons/react/24/outline/FaceFrownIcon'
import FaceSmileIcon from '@heroicons/react/24/outline/FaceSmileIcon'

const EmptyChartMessage = (): JSX.Element => {
    return (
        <>
            <div className="h-1/2 text-neutral-400">
                <div className="flex flex-col h-full items-center justify-center">
                    <div className="inline-flex justify-center">
                        <FaceFrownIcon className="h-10 w-10" />
                        <FaceSmileIcon className="h-10 w-10" />
                    </div>
                    <p className="text-3xl font-medium my-10">No data available</p>
                    <p className="text-normal font-normal">The queue is empty or has not been processed</p>
                </div>
            </div>
            <div className="h-1/2 text-neutral-400 p-4">
                <div className="flex inline-flex items-end space-x-2 w-full h-full">
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
            </div>
        </>
    )
}

export default EmptyChartMessage
