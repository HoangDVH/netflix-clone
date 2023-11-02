/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        login:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/1a5c57fd-7621-42e4-8488-e5ae84fe9ae5/VN-vi-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg')",
      },
      colors: {
        transparent: "transparent",
        current: "rgba(0,0,0,.75)",
        error: "#e87c03",
        white: "#ffffff",
        purple: "#3f3cbb",
        midnight: "#121063",
        metal: "#565584",
        tahiti: "#3ab7bf",
        silver: "#ecebff",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
        info: "rgba(109, 109, 110, 0.7)"
      },
      fontSize: {
        m: "10px",
      },
    },
  },
  plugins: [],
};
