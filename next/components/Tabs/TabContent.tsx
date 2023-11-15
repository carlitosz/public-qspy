import React from 'react'

export interface TabContentProps {
    id: HTMLDivElement['id']
    content: React.ReactNode
    selected: boolean
}

const TabContent = ({ id, content, selected }: TabContentProps): JSX.Element => {
    return (
        <div aria-labelledby={id + '-tab'} className={`content ${selected ? '' : 'hidden'}`} id={id} role="tabpanel">
            {content}
        </div>
    )
}

export default TabContent
