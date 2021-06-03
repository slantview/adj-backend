const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        spinner: (theme) => ({
            default: {
              color: 'rgba(37, 99, 235, 1.0)', // color you want to make the spinner
              size: '2em', // size of the spinner (used for both width and height)
              border: '4px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
              speed: '1000ms', // the speed at which the spinner should rotate
            },
            building: {
              color: theme('colors.yellow.500', 'yellow'),
              size: '1em',
              border: '2px',
              speed: '500ms',
            },
        }),
        extend: {
            fontFamily: {
                sans: ['Poppins', ...defaultTheme.fontFamily.sans],
            },
        },
    },
    variants: {
        spinner: ['responsive'],
        extend: {},
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-spinner')({ className: 'spinner', themeKey: 'spinner' }),
    ]
}
