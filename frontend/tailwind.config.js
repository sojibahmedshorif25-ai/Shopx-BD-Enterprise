/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316', // Daraz / ShopX Orange
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        organic: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e', // GhorerBazar Green
          600: '#16a34a',
          700: '#15803d',
        },
        navy: {
          800: '#0f172a',
          900: '#090d16',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Hind Siliguri', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
      animation: {
        pulseGlow: 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
};
