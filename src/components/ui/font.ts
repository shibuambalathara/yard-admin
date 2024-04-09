import { Inter, Roboto_Mono, Poppins, Roboto } from 'next/font/google';

 const inter = Inter({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '900'],
  style: ['normal',  ],

  variable: '--font-inter',
});

 const roboto_mono_init = Roboto_Mono({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', ],
  variable: '--font-roboto-mono',
  style: ['normal', 'italic'],

});

 const roboto_init = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'], 
  variable: '--font-roboto',
  style: ['normal', 'italic'],

});

 const Poppins_init = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '700', '900'],
  variable: '--font-roboto',
  style: ['normal', 'italic'],

});

export const  inter_Font=inter.variable
export const  roboto_mono_Font=roboto_mono_init.variable
export const  roboto_init_Font=roboto_init.variable
export const  Poppins_Font=Poppins_init.variable
