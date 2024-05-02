import React from 'react'

interface TableProps {
    children: React.ReactNode
}

const Table = ({ children }: TableProps): JSX.Element => {
    return <table className="table">{children}</table>
}

export default Table
