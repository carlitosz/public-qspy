import React from 'react'

interface TableHeadersProps {
    headers: string[]
}

const TableHeaders = ({ headers }: TableHeadersProps): JSX.Element => {
    return (
        <thead>
            <tr>
                {headers.map(
                    (header: string, i: number): React.ReactNode => (
                        <th scope="col" key={i}>
                            {header}
                        </th>
                    )
                )}
            </tr>
        </thead>
    )
}

export default TableHeaders
