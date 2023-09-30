/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements-react/dist/js/**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: {
        default: ['var(--font-inter)'],
      },
      keyframes: {
        shake: {
          '0%'  : { transform: 'rotate(-0.5deg)' },
          '50%' : { transform: 'rotate(0.5deg)' },
          '100%': { transform: 'rotate(0deg)' },
        }
      },
      animation: {
        shake: 'shake 0.1s ease-in-out',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('tw-elements-react/dist/plugin.cjs')
  ],
};
