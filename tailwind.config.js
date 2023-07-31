/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-color': '#22d7a2',
        'seconday-color': '#1aa2b0',
      }
    },
  },
  plugins: [],
}

