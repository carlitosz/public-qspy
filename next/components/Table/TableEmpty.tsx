import React from 'react'

interface TableEmptyProps {
    searchText?: string
}

const TableEmpty = ({ searchText }: TableEmptyProps): JSX.Element => {
    return (
        <div className="flex flex-col items-center justify-center py-6">
            <p className="text-primary text-2xl my-6">It&apos;s a bit empty here</p>
            {searchText && (
                <p className="text-title w-full text-center">
                    No results found for <span className="italic">&quot;{searchText}&quot;</span>
                </p>
            )}
        </div>
    )
}

export default TableEmpty
