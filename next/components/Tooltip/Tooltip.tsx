import React from 'react'
import { formatDistance, format } from 'date-fns'

import AnalyticsNumber from '@/components/Analytics/AnalyticsNumber'
import DropdownItem from '@/components/Dropdown/Item'

import type { DropdownItemType } from '@/components/Dropdown/Item'
import type { SeriesDataPoint } from '@/util/series'

const Tooltip = ({ x, y, meta }: SeriesDataPoint): JSX.Element => {
    if (!x || !y || !meta) {
        return <></>
    }

    const items: DropdownItemType[] = [
        {
            divider: true
        },
        {
            title: `Change`
        },
        {
            label: (
                <div className="flex justify-between items-end w-full">
                    <span className="text-xs text-title font-semibold">Since yesterday</span>
                    <AnalyticsNumber number={meta.diff.change} />
                </div>
            )
        },
        {
            title: `Occurrences`
        },
        {
            label: `Oldest: ${formatDistance(new Date(meta.firstSeen), new Date(), { addSuffix: true })} (${format(
                new Date(meta.firstSeen),
                'MMM do'
            )})`
        },
        {
            label: `Newest: ${formatDistance(new Date(meta.lastSeen), new Date(), { addSuffix: true })} (${format(
                new Date(meta.lastSeen),
                'MMM do'
            )})`
        }
    ]

    return (
        <div className="tooltip">
            <div className="flex flex-col justify-center items-center p-2">
                <p className="text-xs text-text">{meta.path}</p>
                <p className="text-xs text-primary">{x}</p>
                <p className="text-5xl font-semibold text-primary mt-2">{y}</p>
            </div>
            <ul className="flex flex-col">
                {items &&
                    items.map(
                        (
                            { divider, icon, onClick, label, title, selected }: DropdownItemType,
                            index: number
                        ): JSX.Element => {
                            if (divider) {
                                return <div className="h-1 w-full border-b border-border" key={index} />
                            }

                            return (
                                <DropdownItem
                                    id={`item-${index}`}
                                    icon={icon}
                                    onClick={onClick}
                                    role="none"
                                    key={index}
                                    label={label}
                                    tabIndex={-1}
                                    title={title}
                                    selected={selected}
                                />
                            )
                        }
                    )}
            </ul>
        </div>
    )
}

export default Tooltip
