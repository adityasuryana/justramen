import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      product: ['product-sans', 'sans-serif'],
      cotta: ['cotta', 'sans-serif'],
    },
    colors:{
      yellowPastel: '#FAF6ED',
      greenPastel: '#42544D',
      orangePastel:'#FD7E1C',
      greyPastel:'#A4A4A4',
      blackPastel:'#506760',
      background:'#EEE',
      light:'#F9F9F9',
      dark:'#342E37',
      redPastel:'#dc3545'
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["caramellatte"],
  }
}


