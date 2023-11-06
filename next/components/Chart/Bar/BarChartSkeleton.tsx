import React from 'react'

import { Orientation } from 'types'

interface BarChartSkeletonProps {
    orientation: Orientation
}

const BarChartSkeleton = ({ orientation }: BarChartSkeletonProps): JSX.Element => {
    return (
        <>
            <div className="h-16 w-full">
                <div className="flex justify-between items-center border-b border-b-extralight h-full p-4">
                    <div className="w-1/4 h-4 bg-extralight rounded-full" />
                    <div className="w-8 h-8 bg-extralight rounded-full" />
                </div>
            </div>

            <div className="h-full w-full">
                {orientation === 'vertical' ? (
                    <div className={orientation}>
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                        <div className="bar" />
                    </div>
                ) : (
                    <div className={orientation}>
                        <div className="labels">
                            <div className="label" />
                        </div>
                        <div className="bars">
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                            <div className="bar" />
                        </div>
                    </div>
                )}
            </div>

            <div className="h-16 w-full">
                <div className="border-t border-t-extralight h-full">
                    <div className="pagination-container h-full">
                        <div className="h-full w-1/3 flex items-center justify-start">
                            <div className="h-4 w-36 bg-extralight rounded-full" />
                        </div>
                        <div className="h-full w-1/3 flex items-center justify-center">
                            <div className="h-8 w-96 bg-extralight rounded-full" />
                        </div>
                        <div className="h-full w-1/3 flex items-center justify-end">
                            <div className="h-8 w-8 bg-extralight rounded-full" />
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </>
    )
}

export default BarChartSkeleton
