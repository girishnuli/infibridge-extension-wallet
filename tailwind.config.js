module.exports = {
    purge: ['./src/**/*.svelte'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [require('tailwindcss-font-inter'), require('@tailwindcss/forms')],
}
