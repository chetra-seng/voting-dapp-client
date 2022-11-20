/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      "1840px": "1840px",
      "1500px": "1500px",
      "1200px": "1200px",
      "900px": "900px",
      "670px": "670px"
    },
    extend: {
      colors: {
        "primary": {
          100: "#7A28CB",
          80: "#9955DD",
          60: "#B27FE6",
          40: "#CCAAEE",
          20: "#E5D4F7",
          "dark": "#19082B"
        },
        "secondary": {
          100: "#4361EE",
          80: "#4463EE",
          60: "#738AF2",
          40: "#A1B1F7",
          20: "#D0D8FB"
        },
        "tertiary": {
          100: "#4CC9F0",
          80: "#43C7EF",
          60: "#72D5F3",
          40: "#A1E3F7",
          20: "#D0F1FB"
        },
        "success": "#76FF6A",
        "error": "#FB3640",
        "input": "#E3E3E3",
        "white": "#FFFFFF",
        "text1": "#140722",
        "text2": "#393939"
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
