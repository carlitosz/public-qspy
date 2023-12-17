import React from 'react'

import Table from '@/components/Table/Table'

import type { GetEventsResponse } from 'types'

interface TableContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
}

const TableContainer = ({ data }: TableContainerProps): JSX.Element => {
    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    if (tValidating || yValidating) {
        return (
            <div role="status" className="chart animate-pulse">
                skeleton
            </div>
        )
    }

    if (tError || yError || tData.Data.length === 0) {
        return <div className="chart">empty</div>
    }

    return (
        <div className="h-full w-full">
            <Table />
        </div>
    )
}

export default TableContainer
