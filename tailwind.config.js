/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    colors: {
      'header': '#DDCCAA',
      'red-button': '#E31221',
      'red-star': '#DC3545',
      'placeholder': '#6C757D',
      'my-blue': '#0D6EFD',
      'light-cyan': '#CED4DA',
      'light-gray': '#9C9A9A',
      'dark-green': '#0F5132',
    },
    maxWidth: {
      'xl': '600px',
      '540': '540px',
    },
    spacing: {
      '550': '550px',
      '120': '120px',
      '72': '72px',
      '86': '86px',
      '60': '60px',
    },
    backgroundColor: {
      'red-button': '#E31221',
      'button-hover': '#CC0E10',
      'button-active': '#B80D0F',
      'button-disabled': '#EC4C57',
      'outside-modal': 'rgba(0, 0, 0, 0.54)',
      'input': '#CED4DA',
      'header': '#212529',
      'dark-blue': '#11101A',
      'pop-up': "#BADBCC",
      'quote-background': '#11101A',
    },
    borderColor: {
      'red-button': '#E31221',
      'input': '#CED4DA',
      'password-div': 'rgba(206, 212, 218, 0.2)'
    },
    fontFamily: {
      'title': ['Montserrat', 'sans-serif'],
      'helvetica': ['Helvetica Neue', 'sans-serif'],
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
};