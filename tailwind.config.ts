import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      tablet: "640px",
      laptop: "1000px",
      mobile: { max: "639px" },
    },
    colors: {
      lightPink: "#FC5185",
      lightBlue: "#3FC1C9",
      lightBlueBg: "#176B87",
      white: "#FFFFFF",
      text: "#103F53",
      lightGrey: "#D9D9D9",
    },
  },
  plugins: [],
};
export default config;
