import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        '85': '22rem', // Define custom width value for w-85
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },

      fontFamily:{
        roboto:['var(--font-roboto)'],
        poppins:['var(--font-poppins)']
      }
    },
  },
  plugins: [require("daisyui"),
  require("tailwind-scrollbar-hide") 
],

  // daisyUI config (optional - here are the default values)
  daisyui: {
    themes: true, 
    darkTheme: "dark", 
    base: true, 
    styled: true, 
    utils: true,
    prefix: "", 
    logs: true, 
    themeRoot: ":root", 
  },
  
};
export default config;
