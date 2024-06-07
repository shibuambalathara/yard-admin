import React from "react";

import HeaderItems from "./headerItems";
import useAuthStore from "@/store/useAuthStore";
const Header = () => {
  
  

  return (
    <div className="w-full  shadow-lg flex items-center justify-between ">
<div className="w-full h-full flex justify-start items-center">
<h4 className="font-poppins font-bold uppercase  text-center pt-1 my-auto w-85 h-full tracking-wider text-black">AutoBse Yard Mangement</h4>

</div>
      <HeaderItems />
    </div>
  );
};

export default Header;
