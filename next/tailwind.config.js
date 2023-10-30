/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    plugins: [],
    purge: {
        enabled: true,
        content: './**/*.html'
    },
    theme: {
        extend: {
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
}
