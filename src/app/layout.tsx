import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header/header";

const inter = Inter({ subsets: ["latin"] });

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
    <div className="">
     
        <Header/>
 
      <div className="flex flex-grow">

      <Sidebar />
      <div className="flex flex-grow flex-col">{children}</div>
      </div>
    </div>
  );
}
