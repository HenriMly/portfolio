const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",],
  theme: {
    extend: {
      fontFamily: {
        // Police de tout le site, chargée dans src/index.js
        sans: ['"Bricolage Grotesque Variable"', ...defaultTheme.fontFamily.sans],
        // Police pixel du mini-jeu, chargée dans SpaceInvaders.jsx
        pixel: ["Silkscreen", "monospace"],
      },
    },
  },
  plugins: [],
}

