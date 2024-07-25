/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'], // for Google Font
        custom: ['CustomFont', 'sans-serif'], // for Custom Font
      },
    },
  },
  plugins: [],
}
