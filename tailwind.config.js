/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily : {
        "roboto": ['Roboto', 'Open Sans'],
      },
      colors : {
        primary : "var(--primary)",
        secondary : "var(--secondary)",
      },
      screens:{
        "3xl": "1645px",
      }
    }
  },
  plugins: [],
}

