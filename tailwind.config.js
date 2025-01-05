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
        customBrown: '#EBDBD1',
        customOrange: '#FF642F',
        customDarkBrown: '#63483F',
        customLightGreen: "#9FB59D",
        customWhite: "#FFFCF3",
        customLightBrown: "#D2C1B8"
      },

      fontFamily: {
        jura: ['Jura'], 
        kodchasan: ['Kodchasan'], 
        itim: ['Itim'],
      },

    },
  },
  plugins: [nextui()],
}
