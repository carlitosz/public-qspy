import React from 'react'
import MagnifyingGlassIcon from '@heroicons/react/24/solid/MagnifyingGlassIcon'

interface TableProps {}

const Table = ({}: TableProps): JSX.Element => {
    return (
        <div className="h-full w-full">
            <div className="p-4 bg-component border-border">
                <label htmlFor="table-search" className="sr-only">
                    Search
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <MagnifyingGlassIcon className="icon-sm" />
                    </div>
                    <input
                        type="text"
                        id="table-search"
                        className="block p-2 ps-10 text-xs text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search"
                    />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Event</th>
                        <th scope="col">Count</th>
                        <th scope="col">Last seen</th>
                        <th scope="col">First seen</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">Apple MacBook Pro 17</th>
                        <td>Silver</td>
                        <td>Laptop</td>
                        <td>$2999</td>
                    </tr>
                    <tr>
                        <th scope="row">Microsoft Surface Pro</th>
                        <td>White</td>
                        <td>Laptop PC</td>
                        <td>$1999</td>
                    </tr>
                    <tr>
                        <th scope="row">Magic Mouse 2</th>
                        <td>Black</td>
                        <td>Accessories</td>
                        <td>$99</td>
                    </tr>
                    <tr>
                        <th scope="row">Apple Watch</th>
                        <td>Silver</td>
                        <td>Accessories</td>
                        <td>$179</td>
                    </tr>
                    <tr>
                        <th scope="row">iPad</th>
                        <td>Gold</td>
                        <td>Tablet</td>
                        <td>$699</td>
                    </tr>
                    <tr>
                        <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                            Apple iMac 27
                        </th>
                        <td>Silver</td>
                        <td>PC Desktop</td>
                        <td>$3999</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Table
