/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      lineHeight: {
        '1.5': '1.5',
      },
      fontSize: {
        icon: '.93rem',
      },
      fontWeight: 'normal',
      borderRadius: {
        'none': '0',
        'sm': '.5rem',
        DEFAULT: '.8rem',
        'lg': '1.2rem',
        'full': '9999px',
      },
      colors: {
        'background': {
          'light': '#f0f4f7',
          DEFAULT: '#f0f4f7',
          'dark': '#282B2D',
        },
        'panel': {
          'light': '#ffffff',
          DEFAULT: '#ffffff',
          'dark': '#313439',
        },
        'text': {
          'light': '#000000',
          DEFAULT: '#000000',
          'dark': '#ffffff',
        },
        'primary': {
          DEFAULT: '#304f8d',
        },
        'primary-hover': {
          DEFAULT: '#355492',
        },
        'primary-active': {
          DEFAULT: '#2B4A88',
        },
        'primary-stroke': {
          'light': '#576c94',
          DEFAULT: '#576c94',
          'dark': '#1e3664',
        },
        'secondary': {
          'light': '#cee7ff',
          DEFAULT: '#cee7ff',
          'dark': '#304F8D',
        },
        'link-text': {
          'light': '#304f8d',
          DEFAULT: '#304f8d',
          'dark': '#cefaff',
        },
        'button-background': {
          'light': '#f5f5f5',
          DEFAULT: '#f5f5f5',
          'dark': '#424449',
        },
        'button-background-hover': {
          'light': '#fafafa',
          DEFAULT: '#fafafa',
          'dark': '#47494e',
        },
        'button-background-active': {
          'light': '#f0f0f0',
          DEFAULT: '#f5f5f5',
          'dark': '#3D3F44',
        },
        'button-stroke': {
          'light': '#d3d3d3',
          DEFAULT: '#d3d3d3',
          'dark': '#373a3f',
        },
        'input-background': {
          'light': '#f4f4f4',
          DEFAULT: '#f4f4f4',
          'dark': '#282b2d',
        },
        'input-stroke': {
          'light': '#e4e4e4',
          DEFAULT: '#e4e4e4',
          'dark': '#424449',
        },
        'on-primary': {
          DEFAULT: '#ffffff',
        },
      }
    },
  },
  plugins: [],
}; // Add a semicolon here

