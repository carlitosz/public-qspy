import React, { useEffect, useState } from 'react'

import { useTheme } from '@/util/theme'
import type { Theme } from '@/util/theme'

interface SwitchProps {
    icons: {
        checked: React.ReactNode
        unchecked: React.ReactNode
    }
}

const SwitchTheme = ({ icons }: SwitchProps) => {
    const theme: Theme = useTheme()
    const [checked, setChecked] = useState<boolean>(typeof window !== 'undefined' && theme.currentTheme === 'dark')

    useEffect(() => {
        checked ? theme.setTheme('dark') : theme.setTheme('light')
    }, [checked, theme])

    return (
        <div className="flex items-center justify-center w-full">
            <label className="flex items-center cursor-pointer" htmlFor="toggle">
                <div className="relative">
                    <input
                        aria-label={`Toggle to ${!checked ? 'checked' : 'unchecked'}`}
                        aria-checked={checked}
                        type="checkbox"
                        id="toggle"
                        className="switch"
                        checked={checked}
                        onChange={() => setChecked(!checked)}
                    />
                    <div className={`pane ${checked ? 'checked' : 'unchecked'}`} />
                    <div className="dot">{checked ? icons.checked : icons.unchecked}</div>
                </div>
            </label>
        </div>
    )
}

export default SwitchTheme
