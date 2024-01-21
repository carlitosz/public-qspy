import '@testing-library/jest-dom'
import React from 'react'
import { format } from 'date-fns-tz'
import { subDays } from 'date-fns'

import TableBody from '@/components/Table/TableBody'
import { render, screen } from '@/test-config'
import Pill from '@/components/Pill/Pill'

describe('<TableBody />', () => {
    describe('When the table is empty', () => {
        describe('When the user is searching', () => {
            test('it displays a message for empty search results', () => {
                render(
                    <table>
                        <TableBody data={[]} searchText="Hello world!" />
                    </table>
                )

                expect(screen.getByLabelText('Empty table')).toHaveTextContent("It's a bit empty here")
                expect(screen.getByLabelText('Empty table')).toHaveTextContent('No results found for "Hello world!"')
            })
        })

        describe('When the user is browsing', () => {
            test('it displays a message with empty results', () => {
                render(
                    <table>
                        <TableBody data={[]} />
                    </table>
                )

                expect(screen.getByLabelText('Empty table')).toHaveTextContent("It's a bit empty here")
                expect(screen.getByLabelText('Empty table')).not.toHaveTextContent(
                    'No results found for "Hello world!"'
                )
            })
        })
    })

    describe('When the table is populated', () => {
        test('it displays all data', () => {
            render(
                <table>
                    <TableBody
                        data={[
                            {
                                event: 'My\\Cool\\Event',
                                count: 1,
                                ls: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm z'), // 1 day ago
                                fs: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm z'), // 1 day ago
                                change: 1
                            }
                        ]}
                    />
                </table>
            )

            expect(screen.getByLabelText('Table body').children.length).toBe(1)
            expect(screen.getByLabelText('Name')).toHaveTextContent('Event')
            expect(screen.getByLabelText('Count')).toHaveTextContent('1')
            expect(screen.getByLabelText('Change').firstChild).toHaveClass('pill danger')
            expect(screen.getByLabelText('Change')).toHaveTextContent('1')
            expect(screen.getByLabelText('Last seen')).toHaveTextContent('1 day ago')
            expect(screen.getByLabelText('First seen')).toHaveTextContent('1 day ago')
        })
    })
})
