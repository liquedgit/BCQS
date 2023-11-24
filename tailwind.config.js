import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        20: "20rem",
      },
      scale: {
        sm: "1.05",
      },
    },
  },
  plugins: [daisyui],
};
