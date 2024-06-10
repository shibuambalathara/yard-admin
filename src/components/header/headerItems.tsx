import React from "react";

import { IoMenu } from "react-icons/io5";

import UserDetails from "./userDetails";
import Theme from "./theme";
const HeaderItems= () => {
  return (
    <div className="flex space-x-3 items-center">
    <div className=" flex space-x-5">
        {/* <Theme /> */}
      </div>
<UserDetails/>
    </div>
  );
};

export default HeaderItems;
