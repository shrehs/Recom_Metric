/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-watercolor': 'linear-gradient(120deg, #fce7f3 0%, #fff1f2 100%)',
      },
      colors: {
        coral: {
          50: '#fff5f5',
          100: '#ffe0e0',
          200: '#ffc2c2',
          300: '#ff9b9b',
          400: '#ff7070',
          500: '#ff4040',
          600: '#ff1f1f',
          700: '#ff0000',
          800: '#e60000',
          900: '#cc0000',
        },
      },
      borderWidth: {
        'thin': '0.5px',
      },
    },
  },
  plugins: [],
};