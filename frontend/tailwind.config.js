/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#e9208f",
        "background-light": "#f8f6f7",
        "background-dark": "#000000",
        "surface": "#1a1a1a",
        "border": "#333333",
        "input": "#111111",
        "card-dark": "#1a1a1a",
        "surface-dark": "#1a1a1a",
        "border-dark": "#333333",
        "card-surface": "#1a1a1a",
        "input-fill": "#111111",
        "input-border": "#333333"
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"]
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "12px",
        "full": "9999px"
      },
    },
  },
  plugins: [],
}
