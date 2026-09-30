/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#f97316',
          600: '#ea580c',
        },
        navy: {
          900: '#0f172a',
          950: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Hind Siliguri', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
