/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Segoe UI Variable Display"', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      lineHeight: {
        1.5: '1.5'
      },
      fontSize: {
        DEFAULT: '1rem',
        icon: '1rem'
      },
      fontWeight: 'normal',
      borderRadius: {
        none: '0',
        sm: '.2rem',
        DEFAULT: '.3rem',
        lg: '.5rem',
        full: '9999px'
      },
      colors: {
        background: {
          light: '#f0f4f7',
          DEFAULT: '#f0f4f7',
          dark: '#282B2D',
          color: '#f3f3f3'
        },
        panel: {
          light: '#ffffff',
          DEFAULT: '#ffffff',
          dark: '#313439'
        },
        text: {
          light: '#000000',
          DEFAULT: '#000000',
          dark: '#ffffff'
        },
        primary: {
          DEFAULT: '#037EC9',
          color: '#0176d3',
          sidebar: '#014486',
          border: '#0070d2',
          'border-secondary': '#4194f9'
        },
        'primary-hover': {
          DEFAULT: '##67A1ED'
        },
        'primary-active': {
          DEFAULT: '#0375BA'
        },
        'primary-stroke': {
          light: '#037BC4',
          DEFAULT: '#037BC4',
          dark: '#037BC4'
        },
        secondary: {
          light: '#cee7ff',
          DEFAULT: '#cee7ff',
          dark: '#304F8D',
          color: 'f3f3f3'
        },
        'link-text': {
          light: '#014486',
          DEFAULT: '#014486',
          dark: '#cefaff'
        },
        'button-background': {
          light: '#f5f5f5',
          DEFAULT: '#f5f5f5',
          dark: '#424449'
        },
        'button-background-hover': {
          light: '#fafafa',
          DEFAULT: '#fafafa',
          dark: '#47494e'
        },
        'button-background-active': {
          light: '#f0f0f0',
          DEFAULT: '#f5f5f5',
          dark: '#3D3F44'
        },
        'button-stroke': {
          light: '#d3d3d3',
          DEFAULT: '#d3d3d3',
          dark: '#373a3f'
        },
        'input-background': {
          light: '#f4f4f4',
          DEFAULT: '#f4f4f4',
          dark: '#282b2d'
        },
        'input-stroke': {
          light: '#e4e4e4',
          DEFAULT: '#e4e4e4',
          dark: '#424449'
        },
        'on-primary': {
          DEFAULT: '#ffffff'
        }
      },
      animation: {
        modal: 'modal 0.1s ease-in-out',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'to-top': 'to-top 0.2s ease-in-out',
        appearing: 'appearing 0.3s ease-in-out'
      },
      keyframes: {
        modal: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        pulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }
        },
        'to-top': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        appearing: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: []
}; // Add a semicolon here
