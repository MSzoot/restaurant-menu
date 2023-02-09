/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: ["./*.{html,js}"],
    content: ["./*.{html,js}"],
    theme: {
    extend: {
      colors: {
        'cus-blue': '#1B244A'
      },
      width: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
