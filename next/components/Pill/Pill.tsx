import React from 'react'

export interface PillProps {
    color?: 'danger' | 'success' | 'neutral'
    icon?: React.ReactNode
    label: string
    style?: 'solid' | 'outline' | 'none'
}

const Pill = ({ color = 'neutral', icon, label, style = 'none' }: PillProps): JSX.Element => {
    return (
        <div className={`pill ${style} ${color}`} role="status">
            {icon}
            <span className="text-xs font-semibold antialiased">{label}</span>
        </div>
    )
}

export default Pill
