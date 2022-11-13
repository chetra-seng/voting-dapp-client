/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-100": "#7A28CB",
        "primary-80": "#9955DD",
        "primary-60": "#B27FE6",
        "primary-40": "#CCAAEE",
        "primary-20": "#E5D4F7",
        "primary-dark": "#19082B",
        "secondary-100": "#4361EE",
        "secondary-80": "#4463EE",
        "secondary-60": "#738AF2",
        "secondary-40": "#A1B1F7",
        "secondary-20": "#D0D8FB",
        "tertiary-100": "#4CC9F0",
        "tertiary-80": "#43C7EF",
        "tertiary-60": "#72D5F3",
        "tertiary-40": "#A1E3F7",
        "tertiary-20": "#D0F1FB",
        "success": "#76FF6A",
        "error": "#FB3640",
        "input": "#E3E3E3"
      },
      keyframes: {
        "slide-in": {
          "0%": {
            transform: "translateX(-100%)",
          },
          "100%": {
            transform: "translateX(0%)",
          },
        },
      },
      animation: {
        "slide": "slide-in 0.5s ease-in",
      },
    },
  },
  plugins: [],
}
