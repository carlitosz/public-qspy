/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
    darkMode: 'class',
    plugins: [],
    theme: {
        extend: {
            scale: {
                '-100': '-1'
            }
        }
    }
}
