import React from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'

import Dropdown, { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface PaginationResultsPerPageProps {
    dropdownDirection: DropdownDirection
    resultsPerPage: number
    updateResultsPerPage: (desiredResults: number) => void
    totalResults: number
}

const PaginationResultsPerPage = ({
    dropdownDirection,
    resultsPerPage,
    updateResultsPerPage,
    totalResults
}: PaginationResultsPerPageProps): JSX.Element => {
    const ChevronDown = <ChevronDownIcon className="icon-xs" />
    const ChevronUp = <ChevronUpIcon className="icon-xs" />

    return (
        <Dropdown
            closeIcon={dropdownDirection === 'up' ? ChevronDown : ChevronUp}
            direction={dropdownDirection}
            id={`pagination-dropdown-${dropdownDirection}`}
            items={[
                {
                    heading: true,
                    label: `Results per page`,
                    onClick: () => {},
                    selected: false
                },
                {
                    disabled: totalResults < 10,
                    label: '10',
                    onClick: () => updateResultsPerPage(10),
                    selected: resultsPerPage === 10
                },
                {
                    disabled: totalResults < 20,
                    label: '20',
                    onClick: () => updateResultsPerPage(20),
                    selected: resultsPerPage === 20
                },
                {
                    disabled: totalResults < 30,
                    label: '30',
                    onClick: () => updateResultsPerPage(30),
                    selected: resultsPerPage === 30
                },
                {
                    label: `All (${totalResults})`,
                    onClick: () => updateResultsPerPage(totalResults),
                    selected: resultsPerPage === totalResults
                }
            ]}
            openIcon={dropdownDirection === 'up' ? ChevronUp : ChevronDown}
            title={resultsPerPage === totalResults ? `All (${totalResults})` : `${resultsPerPage} per page`}
        />
    )
}

export default PaginationResultsPerPage
