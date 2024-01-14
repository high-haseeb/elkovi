/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brgray: "#E3E5EE",
        brblue:"#0016EC"
      },
    },
    fontFamily: {
      Aeonik: ["Aeonik"],
      AeonikBold: ["AeonikBold"],
    },
  },
  plugins: [],
};
