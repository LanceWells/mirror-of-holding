/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
    './public/**/*.html',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
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
    require('flowbite/plugin')
  ],
};
