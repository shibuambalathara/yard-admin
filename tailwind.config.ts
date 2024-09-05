import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

        screens: {
          '2xs': '290px',
          
        },
      width: {
        '85': '22rem', // Define custom width value for w-85
      },
      // backgroundImage: {
      //   "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      //   "gradient-conic":
      //     "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      // },
      height: {
        'custom': '37rem',
        'form-Modal':'25rem', // Set your custom height value here
      },

      fontFamily:{
        roboto:['var(--font-roboto)'],
        poppins:['var(--font-poppins)']
      }
    },
  },
  plugins: [function({ addUtilities }) {
    addUtilities({
      '.hide-number-arrows': {
        '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
          '-webkit-appearance': 'none',
          'margin': '0',
        },
        '&[type=number]': {
          '-moz-appearance': 'textfield',
        },
      },
    });
  },require("daisyui"),
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
