import React, { useEffect, useState } from 'react'

import Pagination from '@/components/Pagination/Pagination'
import ResultsPerPage from '@/components/Pagination/ResultsPerPage'
import Table from '@/components/Table/Table'

import { createTableData, paginate } from '@/util/data'

import type { DomainEvent, GetEventsResponse } from 'types'

interface TableContainerProps {
    data: {
        today: GetEventsResponse | undefined
        yesterday: GetEventsResponse | undefined
    }
}

const TableContainer = ({ data }: TableContainerProps): JSX.Element => {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [pages, setPages] = useState<[DomainEvent[]] | [[]]>([[]])
    const [resultsPerPage, setResultsPerPage] = useState<number>(10)

    const { isValidating: tValidating, error: tError, data: tData } = data.today
    const { isValidating: yValidating, error: yError, data: yData } = data.yesterday

    useEffect(() => {
        if (tData) {
            setPages(paginate(tData.Data, resultsPerPage))
        }
    }, [tData, resultsPerPage])

    useEffect(() => setCurrentPage(0), [resultsPerPage])

    if (tValidating || yValidating) {
        return (
            <div role="status" className="animate-pulse">
                skeleton
            </div>
        )
    }

    if (tError || yError) {
        return <>error</>
    }

    return (
        <>
            {pages[currentPage].length > 0 && (
                <div className="flex items-end justify-between mb-2">
                    <ResultsPerPage
                        currentPage={currentPage}
                        currentPageTotal={pages[currentPage].length}
                        resultsPerPage={resultsPerPage}
                        totalResults={tData.Data.length}
                    />
                    <Pagination
                        currentPage={currentPage}
                        dropdownDirection="down"
                        goToPage={(desiredPage: number) => {
                            if (desiredPage < 0 || desiredPage >= pages.length) {
                                return
                            }

                            setCurrentPage(desiredPage)
                        }}
                        numPages={pages.length}
                        resultsPerPage={resultsPerPage}
                        setResultsPerPage={(desiredResults: number) => {
                            if (desiredResults < 0 || desiredResults > tData.Data.length) {
                                return
                            }

                            setResultsPerPage(desiredResults)
                        }}
                        totalResults={tData.Data.length}
                    />
                </div>
            )}
            <div className="table-container">
                {pages[currentPage].length > 0 ? (
                    <Table data={createTableData(pages[currentPage], yData.Data)} />
                ) : (
                    <div className="flex flex-col items-center justify-center py-6">
                        <p className="text-danger text-xl">Uh-oh!</p>
                        <p className="text-text text-md mb-4">We have nothing to display.</p>
                        <div className=" p-8 h-full w-1/2 rounded-md">
                            <p className="text-primary text-md font-semibold border-b border-border py-2">
                                Possible reasons
                            </p>
                            <ol className="text-title list-disc my-2">
                                <li>Your queue is empty 🥳 Check again tomorrow!</li>
                                <li>
                                    Your queue has not been processed today. If you want to manually process your queue,
                                    follow the instructions here.
                                </li>
                            </ol>
                        </div>
                    </div>
                )}
            </div>
            {pages[currentPage].length > 0 && (
                <div className="flex justify-between my-2">
                    <ResultsPerPage
                        currentPage={currentPage}
                        currentPageTotal={pages[currentPage].length}
                        resultsPerPage={resultsPerPage}
                        totalResults={tData.Data.length}
                    />
                    <Pagination
                        currentPage={currentPage}
                        dropdownDirection="up"
                        goToPage={(desiredPage: number) => {
                            if (desiredPage < 0 || desiredPage >= pages.length) {
                                return
                            }

                            setCurrentPage(desiredPage)
                        }}
                        numPages={pages.length}
                        resultsPerPage={resultsPerPage}
                        setResultsPerPage={(desiredResults: number) => {
                            if (desiredResults < 0 || desiredResults > tData.Data.length) {
                                return
                            }

                            setResultsPerPage(desiredResults)
                        }}
                        totalResults={tData.Data.length}
                    />
                </div>
            )}
        </>
    )
}

export default TableContainer
