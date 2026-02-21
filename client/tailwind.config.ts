/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
    "./components/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        instagram: "var(--font-instagram)",
      },
      colors: {
        accent: {
          yellow: "#f6c400",
          cyan: "#34d399",
          purple: "#b084f5",
        },
      },
      dropShadow: {
        neon: "0 0 20px rgba(0,0,0,0.6)",
      },
    },
  },
  plugins: [],
};
