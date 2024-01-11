import React, { useEffect, useState } from 'react'

type QSpyTheme = 'dark' | 'light'

// Main type definition for Theme.
export declare type Theme = {
    currentTheme?: QSpyTheme
    getTheme: () => QSpyTheme
    setTheme: (newTheme: QSpyTheme) => void
}

// Theme definition defaults.
const ThemeContextDefaults: Theme = {
    currentTheme: 'light',
    getTheme: () => 'light',
    setTheme: (newTheme: QSpyTheme) => undefined
}

const ThemeContext: React.Context<Theme> = React.createContext<Theme>(ThemeContextDefaults)

// Hook to get Theme from within a component.
export const useTheme = (): React.ContextType<typeof ThemeContext> => {
    const context = React.useContext(ThemeContext)

    if (context === undefined) {
        throw new Error(`useTheme must be used within an ThemeProvider`)
    }

    return context
}

// Provider that wraps around the application to provide the Theme to any component.
export const ThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [currentTheme, setCurrentTheme] = useState<QSpyTheme>(() => {
        if (typeof window !== 'undefined' && 'theme' in localStorage) {
            return localStorage.theme
        }

        return 'light'
    })

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
    const getTheme = (): QSpyTheme => currentTheme

    return <ThemeContext.Provider value={{ currentTheme, getTheme, setTheme }}>{children}</ThemeContext.Provider>
}
