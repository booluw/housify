module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#395C6B",
        secondary: "#E6E1C5",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
};
