import React from 'react'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'

import SwitchTheme from '@/components/Switch/SwitchTheme'

const ThemeTab = (): JSX.Element => {
    return (
        <div className="w-full h-full">
            <p className="text-title text-base font-normal antialiased pb-2 border-b border-b-border">
                Theme Preferences
            </p>
            <SwitchTheme
                icons={{ checked: <MoonIcon className="icon-sm" />, unchecked: <SunIcon className="icon-sm" /> }}
            />
        </div>
    )
}

export default ThemeTab
