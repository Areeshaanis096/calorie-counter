/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors:{
      "dark-blue": "#0a0a23",
      "light-yellow": "#fecc4c",
      "dark-yellow": "#feac32",
      "green": "#acd157",
      "red":"#ffadad"

    }
  },
  plugins: [],
};
