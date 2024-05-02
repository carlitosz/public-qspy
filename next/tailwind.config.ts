import type { Config } from 'tailwindcss'

export default {
    content: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
    darkMode: 'class',
    plugins: [],
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--color-border) / <alpha-value>)',
                component: 'hsl(var(--color-component) / <alpha-value>)',
                danger: 'hsl(var(--color-danger) / <alpha-value>)',
                dark: 'hsl(var(--color-dark) / <alpha-value>)',
                disabled: 'hsl(var(--color-disabled) / <alpha-value>)',
                hover: 'hsl(var(--color-hover) / <alpha-value>)',
                page: 'hsl(var(--color-page) / <alpha-value>)',
                primary: 'hsl(var(--color-primary) / <alpha-value>)',
                secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
                success: 'hsl(var(--color-success) / <alpha-value>)',
                text: 'hsl(var(--color-text) / <alpha-value>)',
                title: 'hsl(var(--color-title) / <alpha-value>)'
            },
            fontFamily: {
                sans: ['var(--font-poppins)', 'sans-serif']
            }
        }
    }
} satisfies Config
