import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "light-bg": "#F0F8FF",
        "dark-bg": "#1A2526",
        "blue-ocean": "#1E90FF",
        "teal-dark": "#008DA1",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
