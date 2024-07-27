import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customGrey: "#D9D9D9",
      },
      fontFamily: {
        TiltNeon: ["var(--font-TiltNeon)"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "color-change-2x": "color-change-2x 2s linear  infinite alternate both",
        slideIn: "slideIn 1s ease-in forwards",
      },
      keyframes: {
        "color-change-2x": {
          "0%": {
            background: "#19dcea",
          },
          to: {
            background: "#b22cff",
          },
        },
        slideIn: {
          "0%": {
            opacity: "0",
            transform: "translateY(60px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [daisyui],
};
export default config;
