import React, { useState } from 'react'

import Tab from '@/components/Tabs/Tab'
import TabContent from '@/components/Tabs/TabContent'

import type { TabContentProps } from '@/components/Tabs/TabContent'

interface TabsProps {
    hash: string
    id: HTMLUListElement['id']
    tabs: Array<{
        hash: string
        icon: React.ReactElement
        id: HTMLElement['id']
        content: React.ReactElement<TabContentProps>
        label: string
    }>
}

const Tabs = ({ hash, id, tabs }: TabsProps): JSX.Element => {
    const [selected, setSelected] = useState<HTMLElement['id']>(tabs[0].id)

    return (
        <div className="tabs">
            <ul className="tabs-list" data-tabs-toggle={hash} role="tablist">
                {tabs.map(({ hash, icon, id, label }, index: number) => (
                    <Tab
                        hash={hash}
                        id={id}
                        icon={icon}
                        key={index}
                        label={label}
                        onClick={() => setSelected(id)}
                        selected={selected === id}
                    />
                ))}
            </ul>

            <div className="tabs-content" id={id}>
                {tabs.map(({ content, id }, index: number) => (
                    <TabContent id={id} content={content} key={index} selected={selected === id} />
                ))}
            </div>
        </div>
    )
}

export default Tabs
