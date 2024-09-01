import type { Config } from "tailwindcss";
import daisyui from "daisyui";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#4a51c4",
          dark: "#646cff",
        },
        secondly: {
          light: "#3f45b3",
          dark: "#535bf2",
        },
        background: {
          light: "#f5f5f5",
          dark: "#1c1c1c",
        },
        surface: {
          light: "#ffffff",
          dark: "#2d2d2d",
        },
        text: {
          light: "#333333",
          dark: "#ffffff",
        },
        subtext: {
          light: "#666666",
          dark: "#a0a0a0",
        },
        border: {
          light: "#e0e0e0",
          dark: "#3a3a3a",
        },
        accent: "#00a86b",
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
  compilerOptions: {
    moduleResolution: "node",
  },
  plugins: [daisyui],
};
export default config;
