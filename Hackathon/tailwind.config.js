/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lime: {
          50: '#F7FCEB',
          100: '#E7F4D1',
          200: '#D2EA9E',
          300: '#BCDF6B',
          400: '#A6CE39', // Primary Lime
          500: '#8FB825',
          600: '#72951A',
          700: '#557211',
          800: '#394E09',
          900: '#1D2A03',
        },
        primary: {
          DEFAULT: '#A6CE39',
          hover: '#95BD2D',
          dark: '#82A821',
          pale: '#E7F4D1',
        },
        charcoal: '#111111',
        darkgray: '#333333',
        secgray: '#666666',
        lightgray: '#F1F1F1',
        palelime: '#E7F4D1',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'floating': '0 10px 30px rgba(0, 0, 0, 0.1)',
      }
    },
  },
  plugins: [],
}
