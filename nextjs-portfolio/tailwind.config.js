/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: "#2563eb", // you can now use bg-primary
            50: "#eff6ff",
            100: "#dbeafe",
            200: "#bfdbfe",
            300: "#93c5fd",
            400: "#60a5fa",
            500: "#3b82f6",
            600: "#2563eb", // main primary
            700: "#1d4ed8",
            800: "#1e40af",
            900: "#1e3a8a",
          },
        },
        animation: {
          shine: "shine 1s forwards", // one run per hover
        },
        keyframes: {
          shine: {
            "0%": { left: "-50%" },
            "100%": { left: "125%" },
          },
        },
      },
    },
    plugins: [require('@tailwindcss/typography')],
  }
  