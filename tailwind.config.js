/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#080d17',
          900: '#0d1629',
          800: '#14213D',
          700: '#1e3057',
          600: '#2b4478',
        },
        primary: {
          DEFAULT: '#14213D',
          dark: '#0d1629',
          light: '#1e3057',
        },
        accent: {
          DEFAULT: '#4361EE',
          hover: '#3651d4',
          light: '#eff2fe',
          border: '#c7d2fe',
        },
        highlight: {
          DEFAULT: '#2EC4B6',
          hover: '#25a89c',
          light: '#e7f9f7',
          border: '#a7f0e9',
        },
        brandbg: '#F8FAFC',
        brandtext: {
          DEFAULT: '#172033',
          secondary: '#64748B',
          muted: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        subtle: '0 1px 3px 0 rgba(20, 33, 61, 0.05), 0 1px 2px -1px rgba(20, 33, 61, 0.05)',
        card: '0 4px 6px -1px rgba(20, 33, 61, 0.06), 0 2px 4px -2px rgba(20, 33, 61, 0.04)',
        hover: '0 10px 15px -3px rgba(20, 33, 61, 0.08), 0 4px 6px -4px rgba(20, 33, 61, 0.03)',
      }
    },
  },
  plugins: [],
}
