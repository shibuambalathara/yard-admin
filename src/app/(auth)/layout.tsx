import type { Metadata } from "next";
import { Inter, Roboto_Mono, Poppins, Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import SideBar from "@/components/sidebar/sidebar";
import yms from "../../../public/yard managment system.jpg";

import { useRouter } from "next/navigation";
import "../globals.css";
import Image from "next/image";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  style: ["normal"],

  variable: "--font-inter",
});

const roboto_mono_init = Roboto_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  variable: "--font-roboto-mono",
  style: ["normal", "italic"],
});

const roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
  style: ["normal", "italic"],
});

const Poppins_init = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700", "900"],
  variable: "--font-poppins",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Yard Management",
  description: "AutoBse Yard Management",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>

      <body className={`${roboto_init.variable} ${Poppins_init.variable} h-screen `}>
        <div className="relative w-full h-full ">
        <div className="w-full h-full absolute z-[-1]  ">
          <Image
            src={yms}
            alt="key"
            objectFit="cover"
            layout="fill"
            quality={100}
            className="bg-opacity-50 "
          />
        </div>
        {children}
        </div>
      </body>
    </html>
  );
}
