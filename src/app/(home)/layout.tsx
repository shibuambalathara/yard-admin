import type { Metadata } from "next";
import { Inter, Roboto_Mono, Poppins, Roboto } from "next/font/google";
import { cookies } from "next/headers";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import SideBar from "@/components/sidebar/sidebar";
import Login from "../(auth)/login/page";
import { useRouter } from "next/navigation";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import ToastProvider from "@/utils/ToastProvider"

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
    <html lang="en" className="h-full ">
      <head></head>

      <body
        className={`${roboto_init.variable} ${Poppins_init.variable} h-full`}
      >
        <div className="flex flex-col h-full ">
          <Header />
          <div className="flex flex-1 h-full">
            <SideBar />
            <div className="flex-1 min-h-full">
              <ToastProvider>
              {children}
              </ToastProvider>
            
              
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
