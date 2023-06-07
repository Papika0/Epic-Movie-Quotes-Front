/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'header': '#DDCCAA',
        'red-button': '#E31221',
        'red-star': '#DC3545',
        'placeholder': '#6C757D',
        'my-blue': '#0D6EFD',
      },
      maxWidth: {
        'xl': '600px',
      },
      spacing: {
        '120': '120px'
      },
      backgroundColor: {
        'red-button': '#E31221',
        'button-hover': '#CC0E10',
        'button-active': '#B80D0F',
        'button-disabled': '#EC4C57',
        'outside-modal': 'rgba(0, 0, 0, 0.54)',
        'input': '#CED4DA',
      },
      borderColor: {
        'red-button': '#E31221',
        'input': '#CED4DA',
      },
      fontFamily: {
        'title': ['Montserrat', 'sans-serif'],
        'helvetica': ['Helvetica Neue', 'sans-serif'],
      },
      gradientColorStops: {
        'home': 'linear-gradient(180deg, #11101A 0%, #08080D 50.52%, #0D0B14 98.75%)'
      },
      backgroundImage: {
        'home1': "url('../assets/images/home/ImageHome1.png')",
        'home2': "url('../assets/images/home/ImageHome2.png')",
        'home3': "url('../assets/images/home/ImageHome3.png')",
      },
      boxShadow: {
        'input': '0px 0px 0px 4px rgba(13, 110, 253, 0.25)',
      },
    },
    plugins: [],
  }
}