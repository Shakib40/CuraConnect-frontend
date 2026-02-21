/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    require.resolve('preline/preline.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
