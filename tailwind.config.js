const {nextui} = require('@nextui-org/theme');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(card|ripple).js"
  ],
  theme: {
    extend: {
      colors: {
        customGreen: '#3F704A',
        customYellow: '#F8F5EC',
        customGray: '#D9D9D9',
        customDarkGreen: '#3F524F',
      },

      fontFamily: {
        jura: ['Jura', 'sans-serif'], // Add Jura font here
      },

      boxShadow: {
        customRight: '5px 0px 10px rgba(0, 0, 0, 0.25)', // Adjust values as needed
      },
    },
  },
  plugins: [nextui()],
}
