/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        '303a37': '#303a37',
        '313b3e': '#313b3e',
        '2e3333': '#2e3333',
        'c9cdd2': '#c9cdd2',
        '576f56': '#576f56',
      }
    },
  },
  plugins: [],
}