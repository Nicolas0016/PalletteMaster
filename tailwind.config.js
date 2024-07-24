/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js", // Incluye los archivos de Flowbite
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require("flowbite/plugin"), // Agrega el plugin de Flowbite
  ],
  darkMode: "media",
};
