const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: 'media', // or 'media' or 'class'
    theme: {
        spinner: (theme) => ({
            default: {
              color: '#dae1e7', // color you want to make the spinner
              size: '1em', // size of the spinner (used for both width and height)
              border: '2px', // border-width of the spinner (shouldn't be bigger than half the spinner's size)
              speed: '500ms', // the speed at which the spinner should rotate
            },
            // md: {
            //   color: theme('colors.red.500', 'red'),
            //   size: '2em',
            //   border: '2px',
            //   speed: '500ms',
            // },
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
