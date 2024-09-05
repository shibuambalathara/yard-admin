import React from "react";
import HeaderItems from "./headerItems";
import useAuthStore from "@/store/useAuthStore";

const Header = () => {
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
