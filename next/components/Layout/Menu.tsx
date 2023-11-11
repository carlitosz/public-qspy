import React from 'react'

interface MenuProps {
    children: React.ReactNode
}

const Menu = ({ children }: MenuProps): JSX.Element => {
    return <ul className="menu">{children}</ul>
}

export default Menu
