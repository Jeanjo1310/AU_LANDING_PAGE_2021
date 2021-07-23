module.exports = {
  mode: 'jit',
  purge: {
    preserveHtmlElements: false,
    enabled: true,
    content: ['./public/index.html'],
    options:{
      keyframes: true,
      fontFace: true,
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily:{
      maven: 'Maven Pro, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"'
    },
    container:{
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
      }
    },
    extend: {
      colors: {
        vino: {
          light: '#dbbdbd',
          DEFAULT: '#ab6060',
          dark: '#633636',
        },
      },
      screens:{
        '-xl': { 'max': '1279px' },
        // => @media (max-width: 1279px) { ... }

        '-lg': { 'max': '1023px' },
        // => @media (max-width: 1023px) { ... }

        '-md': { 'max': '767px' },
        // => @media (max-width: 767px) { ... }

        '-sm': { 'max': '639px' },
        // => @media (max-width: 639px) { ... }
        '2xl': '1536px',
        // => @media (mix-width: 1280px) { ... }
        '3xl': '2560px',
        // => @media (mix-width: 2560px) { ... }

      }
    }
  },
  variants: {
    extend: {
      borderColor: ['hover','focus'],
      borderWidth: ['hover','focus'],
      padding: ['hover','focus']
    },
  },
  plugins: [],
}
