import React from 'react'
import { formatDistance } from 'date-fns'

import DropdownItem from '@/components/Dropdown/DropdownItem'
import AnalyticsMeta from '@/components/Analytics/AnalyticsMeta'

import type { DropdownItemType } from '@/components/Dropdown/DropdownItem'
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
            title: `Oldest occurrence`
        },
        {
            label: formatDistance(new Date(meta.firstSeen), new Date(), { addSuffix: true })
        },
        {
            title: `Newest occurrence`
        },
        {
            label: formatDistance(new Date(meta.lastSeen), new Date(), { addSuffix: true })
        }
    ]

    return (
        <div className="tooltip">
            <div className="flex flex-col justify-center items-center p-2">
                <p className="text-xs text-light">{meta.path}</p>
                <p className="text-xs text-primary">{x}</p>
                <p className="text-2xl font-semibold text-primary my-2">{y}</p>
                <AnalyticsMeta
                    change={meta.diff.change}
                    message={`from ${meta.diff.eventsYesterday} yesterday`}
                    size="text-xs"
                />
            </div>
            <ul className="flex flex-col">
                {items &&
                    items.map(
                        (
                            { divider, icon, onClick, label, title, selected }: DropdownItemType,
                            index: number
                        ): JSX.Element => {
                            if (divider) {
                                return <div className="h-1 w-full border-b mb-2" key={index} />
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
