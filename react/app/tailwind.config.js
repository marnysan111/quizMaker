/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyberBlue: '#007BFF',
        turquoise: '#17A2B8',
        brightGreen: '#28A745',
        vibrantOrange: '#FD7E14',
        brightPink: '#E83E8C',
        limeGreen: '#DCF354',
        darkGray: '#343A40',
        deepBlue: '#212529',
        white: '#FFFFFF',
        lightGray: '#CED4DA',
        inputBackground: '#495057',
        focusBorder: '#80BDFF',
        neonBlue: '#0dcaf0',
        shadowColor: '#6c757d'
      },
    },
  },
  plugins: [],
}

