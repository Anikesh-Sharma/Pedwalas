/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"], // Adjust this based on your project
  theme: {
    extend: {
      colors: {
        customBeige: "#EFE1D0", // Adding your custom color
      },
    },
  },
  plugins: [],
};
