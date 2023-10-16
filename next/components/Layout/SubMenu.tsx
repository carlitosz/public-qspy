import React from 'react'

interface SubMenuProps {
    label: string
}

const SubMenu = ({ label }: SubMenuProps): JSX.Element => {
    return (
        <li className="my-px">
            <span className="flex font-medium text-sm text-zinc-400 px-4 my-4 uppercase">{label}</span>
        </li>
    )
}

export default SubMenu
