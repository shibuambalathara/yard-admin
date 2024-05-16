"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdManageHistory,
  MdOutlineAddIcCall,
  MdOutlinePreview,
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsArrowLeftCircle } from "react-icons/bs";

const SidebarItem = ({ item }) => {
  const [open, setOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  const toggleSubmenu = (index) => {
    if (openSubmenuIndex === index) {
      // If the submenu is already open, close it
      setOpenSubmenuIndex(null);
    } else {
      // Otherwise, toggle the submenu
      setOpenSubmenuIndex(index);
    }
  };

  const handleClick=()=>{
console.log("button clikced");
  }

  return (
    <div
      className={`bg-gray-800 h-full scrollbar-hide text-white font-roboto relative transition-all duration-300 ${
        open ? "w-85" : "w-16"
      }`}
    >
      <BsArrowLeftCircle
        className={`absolute right-3 top-4  z-50 text-xl cursor-pointer border  border-black rounded-full ${
          !open && `rotate-180`
        }`}
        onClick={() => setOpen(!open)}
      />

      <ul className="pt-8  pl-6 h-full space-y-4">
        {item.map((menu, index) => (
          <React.Fragment key={index}>
            <li
              className={`text-base font-bold  flex items-center p-2  gap-x-4 cursor-pointer hover:bg-gray-700 rounded-md ${
                menu.spacing ? `mt-4` : `mt-3`
              }`}
              onClick={() => toggleSubmenu(index)}
            >
              <span className="text-lg block">
                {menu.icon ? menu.icon : <MdDashboard />}
              </span>
              <span
                className={`${!open && "hidden"} transition-all duration-300`}
              >
                {menu.path ? (
                  <div onClick={handleClick}> 
                    <Link className={`${!open && `hidden`}`} href={menu.path}>
                    {menu.title}
                  </Link>
                  </div>
                ) : (
                  <span>{menu.title}</span>
                )}
              </span>
              {menu.submenu && open && (
                <MdKeyboardArrowDown
                  className={`${openSubmenuIndex === index && "rotate-180"}`}
                />
              )}
            </li>
            {/* {menu.submenu && openSubmenuIndex === index && open && (
              <ul>
                {menu.submenuItems.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    className={`text-base text-white flex items-center gap-x-4 cursor-pointer p-2 px-4 hover:bg-gray-700  rounded-md mt-2`}
                  >
                    <span className="text-base">
                      {submenu.icon ? submenu.icon : <MdOutlineKeyboardArrowRight />}
                    </span>
                    <span>{submenu.title}</span>
                  </li>
                ))}
              </ul>
            )} */}
            {menu.submenu && openSubmenuIndex === index && open && (
              <ul>
                {menu.submenuItems.map((submenu, subIndex) => (
                  <li
                    key={subIndex}
                    className={`text-base text-white flex items-center gap-x-4 cursor-pointer p-2 px-4 hover:bg-gray-700 rounded-md mt-2`}
                  >
                    <span className="text-base">
                      {submenu.icon ? (
                        submenu.icon
                      ) : (
                        <MdOutlineKeyboardArrowRight />
                      )}
                    </span>
                    <span>
                      {submenu.path ? (
                        <Link href={submenu.path}>{submenu.title}</Link>
                      ) : (
                        submenu.title
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default SidebarItem;
