/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#121214',
          card: '#1e1e22',
          border: '#2d2d32',
          hover: '#28282d',
        },
        accent: {
          primary: '#6366f1', // Indigo accent
          active: '#22c55e',  // Green for active time
          afk: '#eab308',     // Yellow/Amber for AFK time
        }
      }
    },
  },
  plugins: [],
}