/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      container: {
        center: true,

      },
    },
    maxWidth: {
      '1536': '1536px'
    }
  },
  plugins: [

  ],

}
