/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './*.tsx',
    './pages/**/*.tsx',
    './components/**/*.tsx',
    './hooks/**/*.ts',
    './utils/**/*.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E2D4E',
        'primary-light': '#2A3F6B',
        'primary-dark': '#141F38',
        secondary: '#3B6B8A',
        accent: '#D4A017',
        cream: '#FFF9E6',
        'gray-warm': '#F0F2F5',
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
