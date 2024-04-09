import type { Metadata } from "next";
// import { Poppins_Font,inter_Font,roboto_init_Font,roboto_mono_Font } from "../components/ui/font";
import { Inter, Roboto_Mono, Poppins, Roboto } from 'next/font/google';

import "./globals.css";

import Header from "@/components/header/header";

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
  variable: '--font-poppins',
  style: ['normal', 'italic'],

});

export const metadata: Metadata = {
  title: "Yard Management",
  description: "AutoBse Yard Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;  
}>) {
  return (

 <html lang="en"> 
    <head >
    </head>
    <body className={`${roboto_init.variable } ${Poppins_init.variable}`}>{children}</body>
    </html> 

    
  );
}
