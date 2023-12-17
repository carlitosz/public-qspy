import type { Config } from 'tailwindcss'

export default {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    plugins: [],
    theme: {
        extend: {
            colors: {
                border: 'hsl(var(--color-border) / <alpha-value>)',
                component: 'hsl(var(--color-component) / <alpha-value>)',
                danger: 'hsl(var(--color-danger) / <alpha-value>)',
                hover: 'hsl(var(--color-hover) / <alpha-value>)',
                page: 'hsl(var(--color-page) / <alpha-value>)',
                primary: 'hsl(var(--color-primary) / <alpha-value>)',
                secondary: 'hsl(var(--color-secondary) / <alpha-value>)',
                success: 'hsl(var(--color-success) / <alpha-value>)',
                text: 'hsl(var(--color-text) / <alpha-value>)',
                title: 'hsl(var(--color-title) / <alpha-value>)'
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif']
            },
            keyframes: {
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-50deg)' },
                    '50%': { transform: 'rotate(50deg)' }
                }
            },
            animation: {
                wiggle: 'wiggle 200ms ease-in-out'
            }
        }
    }
} satisfies Config
