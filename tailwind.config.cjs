/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary-blue': '#1D9BF0',
          'deverr-yellow': '#FDDB14'
        },
      },
    },
    plugins: [],
  }