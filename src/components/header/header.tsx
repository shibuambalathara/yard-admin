"use client"
import React,{useEffect} from "react";
import HeaderItems from "./headerItems";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {


  useEffect(() => {
    // Code in this section runs on mount
    console.log("Component mounted in Header");

    // Return a function to run when the component unmounts
    return () => {
      console.log("Component unmounted in Header");
    };
  }, []); 


  return (
    <div className="w-full p-2 shadow-lg flex items-center justify-between">
      <div className="w-full flex justify-between items-center">
        <h4 className="font-poppins font-bold uppercase text-center my-auto md:w-85 h-full tracking-wider text-black text-sm md:text-base">
          AutoBse Yard Management
        </h4>
        <HeaderItems />
      </div>
    </div>
  );
};

export default Header;
