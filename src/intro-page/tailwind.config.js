/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      serif: ['Kepler', 'sans-serif'],
    },
    extend: {
      colors: {
        'purple': '#7e5bef',
        'grey': {
            "900": "#4F4D55",
            "700": "#C8C8C8",
            "500": "#F4F4F4",
        },
        'success': '#5cb85c'
      }
    }
  },
  plugins: [],
}