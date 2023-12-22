import React from 'react'
import ChevronDownIcon from '@heroicons/react/24/outline/ChevronDownIcon'
import ChevronUpIcon from '@heroicons/react/24/outline/ChevronUpIcon'
import ChevronLeftIcon from '@heroicons/react/24/outline/ChevronLeftIcon'
import ChevronRightIcon from '@heroicons/react/24/outline/ChevronRightIcon'
import ChevronDoubleLeftIcon from '@heroicons/react/24/outline/ChevronDoubleLeftIcon'
import ChevronDoubleRightIcon from '@heroicons/react/24/outline/ChevronDoubleRightIcon'

import Dropdown from '@/components/Dropdown/Dropdown'
import { generateArray } from '@/util/data'

import type { DropdownDirection } from '@/components/Dropdown/Dropdown'

interface PaginationProps {
    currentPage: number
    dropdownDirection: DropdownDirection
    goToPage: (desiredPage: number) => void
    numPages: number
    resultsPerPage: number
    setResultsPerPage: (desiredResults: number) => void
    totalResults: number
}

const Pagination = ({
    currentPage,
    dropdownDirection,
    goToPage,
    numPages,
    resultsPerPage,
    setResultsPerPage,
    totalResults
}: PaginationProps): JSX.Element => {
    const ChevronDown = <ChevronDownIcon className="icon-xs mr-1" />
    const ChevronUp = <ChevronUpIcon className="icon-xs mr-1" />
    const pages = generateArray(0, numPages, 1).slice(currentPage, numPages)

    return (
        <div className="pagination">
            <nav aria-label="Table Navigation" role="navigation">
                <ul className="navigation-numbers">
                    <li>
                        <a
                            aria-label="Go to first page"
                            aria-disabled={currentPage === 0}
                            onClick={() => goToPage(0)}
                            onKeyDown={() => goToPage(0)}
                            role="button"
                            tabIndex={0}
                        >
                            <ChevronDoubleLeftIcon className="icon-xs" />
                        </a>
                    </li>
                    <li>
                        <a
                            aria-label="Go to previous page"
                            aria-disabled={currentPage === 0}
                            onClick={() => goToPage(currentPage - 1)}
                            onKeyDown={() => goToPage(currentPage - 1)}
                            role="button"
                            tabIndex={0}
                        >
                            <ChevronLeftIcon className="icon-xs" />
                        </a>
                    </li>
                    {numPages < 3
                        ? pages.map((value: number, index: number) => {
                              return (
                                  <li key={index}>
                                      <a
                                          aria-label={`Page ${index + 1}`}
                                          aria-current={index === currentPage}
                                          onClick={() => goToPage(index)}
                                          onKeyDown={() => goToPage(index)}
                                          role="button"
                                          tabIndex={index + 1}
                                      >
                                          {index + 1}
                                      </a>
                                  </li>
                              )
                          })
                        : pages.map((value: number, index: number) => {
                              return (
                                  <li key={index}>
                                      <a
                                          aria-label={`Page ${index + 1}`}
                                          aria-current={index === currentPage}
                                          onClick={() => goToPage(index)}
                                          onKeyDown={() => goToPage(index)}
                                          role="button"
                                          tabIndex={index + 1}
                                      >
                                          {index + 1}
                                      </a>
                                  </li>
                              )
                          })}
                    <li>
                        <a
                            aria-label="Go to next page"
                            aria-disabled={currentPage === pages.length - 1}
                            onClick={() => goToPage(currentPage + 1)}
                            onKeyDown={() => goToPage(currentPage + 1)}
                            role="button"
                            tabIndex={pages.length + 1}
                        >
                            <ChevronRightIcon className="icon-xs" />
                        </a>
                    </li>
                    <li>
                        <a
                            aria-label="Go to last page"
                            aria-disabled={currentPage === pages.length - 1}
                            onClick={() => goToPage(pages.length - 1)}
                            onKeyDown={() => goToPage(pages.length - 1)}
                            role="button"
                            tabIndex={pages.length + 1}
                        >
                            <ChevronDoubleRightIcon className="icon-xs" />
                        </a>
                    </li>
                </ul>
            </nav>
            <div className="results-per-page">
                <Dropdown
                    closeIcon={dropdownDirection === 'up' ? ChevronUp : ChevronDown}
                    direction={dropdownDirection}
                    disabled={false}
                    menuItems={[
                        { title: 'Results per page' },
                        {
                            disabled: totalResults < 10,
                            label: 10,
                            onClick: () => setResultsPerPage(10),
                            selected: resultsPerPage === 10
                        },
                        {
                            disabled: totalResults < 20,
                            label: 20,
                            onClick: () => setResultsPerPage(20),
                            selected: resultsPerPage === 20
                        },
                        {
                            disabled: totalResults < 30,
                            label: 30,
                            onClick: () => setResultsPerPage(30),
                            selected: resultsPerPage === 30
                        },
                        {
                            label: `All (${totalResults})`,
                            onClick: () => setResultsPerPage(totalResults),
                            selected: resultsPerPage === totalResults
                        }
                    ]}
                    openIcon={dropdownDirection === 'up' ? ChevronUp : ChevronDown}
                    title={`${resultsPerPage}`}
                />
            </div>
        </div>
    )
}

export default Pagination
