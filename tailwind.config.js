/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        500: ["Quick-Medium"],
        600: ["Quick-SemiBold"],
        700: ["Quick-Bold"],
      },
    },
  },
  plugins: [],
}
