import type { Config } from 'tailwindcss'

export default {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    plugins: [],
    theme: {
        extend: {
            colors: {
                border: 'var(--color-border)',
                component: 'var(--color-component)',
                danger: 'var(--color-danger)',
                hover: 'hsl(var(--color-hover) / <alpha-value>)',
                page: 'var(--color-page)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                success: 'var(--color-success)',
                text: 'var(--color-text)',
                title: 'var(--color-title)'
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
