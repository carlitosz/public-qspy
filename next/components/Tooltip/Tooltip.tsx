import React from 'react'
import { formatDistance } from 'date-fns'

import DropdownMenuItem from '@/components/Dropdown/DropdownItem'

import type { DropdownItem } from '@/components/Dropdown/DropdownItem'
import type { SeriesDataPoint } from '@/util/options'

const Tooltip = ({ x, y, meta }: SeriesDataPoint): JSX.Element => {
    if (!x || !y || !meta) {
        return <></>
    }

    const items: DropdownItem[] = [
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
        <div className="block p-2 w-auto rounded-md bg-neutral-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="flex flex-col justify-center items-center px-2 pb-2">
                <p className="text-lg font-semibold text-indigo-500">{y}</p>
                <p className="text-xs font-normal text-neutral-400">{meta.path}</p>
                <p className="text-sm font-normal text-indigo-500">{x}</p>
            </div>
            <ul className="flex flex-col">
                {items &&
                    items.map(
                        (
                            { divider, icon, onClick, label, title, titleColor, selected }: DropdownItem,
                            index: number
                        ): JSX.Element => {
                            if (divider) {
                                return <div className="h-1 w-full border-b mb-2" key={index} />
                            }

                            return (
                                <DropdownMenuItem
                                    id={`toolbar-${index}`}
                                    icon={icon}
                                    onClick={onClick}
                                    role="none"
                                    key={index}
                                    label={label}
                                    tabIndex={-1}
                                    title={title}
                                    titleColor={titleColor}
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
