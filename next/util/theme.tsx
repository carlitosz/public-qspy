import React, { useEffect, useState } from 'react'

import { QSpyTheme } from 'types'

export declare type Theme = {
    currentTheme: QSpyTheme
    getTheme: () => QSpyTheme
    setTheme: (newTheme: QSpyTheme) => void
}

const ThemeContextDefaults: Theme = {
    currentTheme: 'light',
    getTheme: () => 'light',
    setTheme: (newTheme: QSpyTheme) => undefined
}

const ThemeContext: React.Context<Theme> = React.createContext<Theme>(ThemeContextDefaults)

export const useTheme = (): React.ContextType<typeof ThemeContext> => {
    const context = React.useContext(ThemeContext)

    if (context === undefined) {
        throw new Error(`useTheme must be used within an ThemeProvider`)
    }

    return context
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [currentTheme, setCurrentTheme] = useState<QSpyTheme>('light')

    useEffect(() => {
        if (!('theme' in localStorage)) {
            localStorage.setItem('theme', 'light')
            document.documentElement.setAttribute('data-theme', 'light')
        }

        if (currentTheme === 'dark') {
            localStorage.theme = 'dark'
            document.documentElement.setAttribute('data-theme', 'dark')
        }

        if (currentTheme === 'light') {
            localStorage.theme = 'light'
            document.documentElement.setAttribute('data-theme', 'light')
        }
    }, [currentTheme])

    const setTheme = (newTheme: QSpyTheme) => setCurrentTheme(newTheme)
    const getTheme = (): QSpyTheme => localStorage.theme

    return <ThemeContext.Provider value={{ currentTheme, getTheme, setTheme }}>{children}</ThemeContext.Provider>
}
