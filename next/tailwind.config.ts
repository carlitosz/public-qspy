import type { Config } from 'tailwindcss'

export default {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    plugins: [],
    theme: {
        extend: {
            colors: {
                black: 'var(--color-black)',
                dark: 'var(--color-dark)',
                extradark: 'var(--color-extradark)',
                extralight: 'var(--color-extralight)',
                light: 'var(--color-light)',
                primary: 'var(--color-primary)',
                secondary: 'var(--color-secondary)',
                superdark: 'var(--color-superdark)',
                superlight: 'var(--color-superlight)',
                white: 'var(--color-white)'
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
