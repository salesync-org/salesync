/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      lineHeight: {
        '1.5': '1.5',
      },
      fontWeight: {
        '400': '400',
      },
      colors: {
        background: {
          'light': '#f3f4f6',
          'DEFAULT': '#1a202c',
          'dark': '#000000',
        },
        panel: {
          'light': '#ffffff',
          'DEFAULT': '#2d3748',
          'dark': '#000000',
        },
        primary: {
          'light': '#f6ad55',
          'DEFAULT': '#f6ad55',
          'dark': '#f6ad55',
          'alight': '#f6ad55',
          'adark': '#f6ad55',
          'hlight': '#f6ad55',
          'hdark': '#f6ad55',
          'plight': '#f6ad55',
          'pdark': '#f6ad55',
          'dlight': '#f6ad55',
          'ddark': '#f6ad55',
        },
      }
    },
  },
  plugins: [],
}; // Add a semicolon here

