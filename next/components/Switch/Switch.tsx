import React, { useState } from 'react'

interface SwitchProps {
    icons: {
        checked: React.ReactNode
        unchecked: React.ReactNode
    }
}

const Switch = ({ icons }: SwitchProps) => {
    const [checked, setChecked] = useState(false)

    return (
        <div className="flex items-center justify-center w-full">
            <label className="flex items-center cursor-pointer" htmlFor="toggle">
                <div className="relative">
                    <input
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

export default Switch
