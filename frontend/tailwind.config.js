/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1AA673',
          'green-light': '#DBF6EC',
          yellow: '#FFE683',
          'yellow-light': 'rgba(255, 230, 131, 0.3)',
        },
        secondary: '#F3F4F6',
      },
      fontFamily: {
        sans: ['Lato', 'Rubik', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        sidebar: '0 1px 2px rgba(0,0,0,0.1)',
        card: '0 4px 8px rgba(37,43,42,0.1)',
      },
      width: {
        sidebar: '240px',
      },
    },
  },
  plugins: [],
}
