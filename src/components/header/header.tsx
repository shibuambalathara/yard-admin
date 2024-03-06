import React from "react";

import HeaderItems from "./headerItems";
const Header = () => {
  return (
    <div className="w-full h-10 px-2 shadow-lg flex items-center justify-between ">
      <h4 className="font-serif font-bold">AutoBse Yard</h4>

      <HeaderItems />
    </div>
  );
};

export default Header;
