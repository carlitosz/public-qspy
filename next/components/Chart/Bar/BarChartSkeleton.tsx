import React from 'react'

import { Orientation } from 'types'

interface BarChartSkeletonProps {
    orientation: Orientation
}

const BarChartSkeleton = ({ orientation }: BarChartSkeletonProps): JSX.Element => {
    return (
        <>
            <div className="h-16 w-full">
                <div className="flex justify-between items-center border-b border-b-border h-full p-4">
                    <div className="w-1/4 h-8 bg-border rounded-full" />
                    <div className="w-8 h-8 bg-border rounded-full" />
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
                <div className="footer">
                    <div className="h-8 w-36 bg-border rounded-full" />
                    <div className="flex justify-end items-center">
                        <div className="pagination-container h-full">
                            <div className="h-full w-full flex items-center justify-center">
                                <div className="h-8 w-96 bg-border rounded-full" />
                            </div>
                            <div className="h-8 w-1 mx-4 border-r border-r-border" />
                            <div className="h-full w-full flex items-center justify-end">
                                <div className="h-8 w-8 bg-border rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span className="sr-only">Loading...</span>
        </>
    )
}

export default BarChartSkeleton
