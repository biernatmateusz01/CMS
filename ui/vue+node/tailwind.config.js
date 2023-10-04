// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
    extend: {
      colors: {
        green: {
          light: "#C2EFD4",
          medium: "#267D49",
          dark: "#224F34",
          DEFAULT: "#6BC785",
        },
      },
    },
  },
   variants: {
     extend: {},
   },
   plugins: [],
 }