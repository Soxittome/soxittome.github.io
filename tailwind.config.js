/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#070A0F',
          900: '#0B0F17',
          850: '#0E1420',
          800: '#111827',
          700: '#1F2937',
        },
        accent: {
          cyan: '#38BDF8',
          blue: '#60A5FA',
          emerald: '#34D399',
          violet: '#A78BFA',
          amber: '#F59E0B',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['Cascadia Code', 'Fira Code', 'Consolas', 'Courier New', 'monospace'],
      }
    },
  },
  plugins: [],
}
