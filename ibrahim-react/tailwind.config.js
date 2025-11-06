/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Abel', 'sans-serif'],
        'body': ['Cabin', 'sans-serif'],
        'code': ['Source Code Pro', 'monospace']
      },
      colors: {
        'accent-orange': '#FF8C00',
        'accent-amber': '#FFA500',
      }
    },
  },
  plugins: [],
}
