/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      'sans': ['VT323', 'monospace'],
      'serif': ['VT323', 'monospace'],
    },
    extend: {
      colors: {
        backdrop: 'rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}
