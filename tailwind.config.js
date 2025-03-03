/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#0095F6",
        Secondry: "#1D1D1F",
        AscentOne: "#A3C0Ff",
        AscentTwo: "#407BFF",
        White: "#FAFBFC",
        Gray: "#A1A1A1",
        CardBg: "#f5f5f6",
        Black: "#000000",
      },
    },
  },
  plugins: [],
};
