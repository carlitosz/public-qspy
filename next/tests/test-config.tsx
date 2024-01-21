import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'

import { ThemeProvider } from '@/utils/theme'

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    return <ThemeProvider>{children}</ThemeProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export * from '@testing-library/user-event'
export { customRender as render }
