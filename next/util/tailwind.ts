import { useMemo } from 'react'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../tailwind.config'

export const useTailwind = () => {
    const tailwind = useMemo(() => resolveConfig(tailwindConfig), [tailwindConfig])

    return tailwind
}
