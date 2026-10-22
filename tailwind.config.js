/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          950: '#060606',
          900: '#0B0B0B', // Primary background
          850: '#101010',
          800: '#141414', // Secondary background
          750: '#181818',
          700: '#1F1F1F', // Card surface
          600: '#292929', // Subtle borders
          500: '#404040',
          400: '#737373',
          300: '#A3A3A3', // Muted text
          200: '#D4D0C8',
          100: '#F4F0E8', // Warm ivory text
          blood: '#9E2929', // Muted blood red accent
          'blood-hover': '#B83232',
          'blood-glow': 'rgba(158, 41, 41, 0.25)',
        }
      },
      fontFamily: {
        heading: ['Oswald', '"Bebas Neue"', '-apple-system', 'sans-serif'],
        display: ['"Bebas Neue"', 'Oswald', 'sans-serif'],
        editorial: ['Oswald', '"Bebas Neue"', '-apple-system', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', '-apple-system', 'sans-serif'],
        classical: ['Cinzel', 'serif'],
      },
      letterSpacing: {
        'widest-xl': '0.25em',
        'widest-2xl': '0.35em',
      },
      transitionTimingFunction: {
        'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
}
