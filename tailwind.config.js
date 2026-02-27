/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Fondamentale per il cambio tema 🌙/☀️
  theme: {
    extend: {
      colors: {
        brand: "#6d4aff",
      }
    },
  },
  plugins: [],
}