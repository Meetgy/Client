/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      scrollbar: ['dark'],
      width : {
        "112" : "28rem"
      }
    },
  },
  plugins: [],
}