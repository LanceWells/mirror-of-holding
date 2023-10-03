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
        },
        fold_in: {
          '0%'  : { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0px)', opacity: '1.0' },
        },
        fold_out: {
          '0%': { transform: 'translateY(0px)', opacity: '1.0' },
          '100%'  : { transform: 'translateY(10px)', opacity: '0' },
        }
      },
      animation: {
        shake: 'shake 0.1s ease-in-out',
        fold_in: 'fold_in 0.5s ease-in-out 1 both',
        fold_out: 'fold_out 0.5s ease-in-out 1 both',
      },
    },
  },
  darkMode: 'media',
  plugins: [
    require('flowbite/plugin')
  ],
};
