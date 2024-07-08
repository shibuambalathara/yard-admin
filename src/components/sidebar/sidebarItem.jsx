"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  MdDashboard,
  MdKeyboardArrowDown,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md";
import { BsArrowLeftCircle } from "react-icons/bs";
import { useRouter } from "next/router";

const SidebarItem = ({ item, activePath }) => {
  const [open, setOpen] = useState(true);
  const [openSubmenuIndex, setOpenSubmenuIndex] = useState(null);

  // Function to check if any submenu item matches the active path
  const isAnySubmenuActive = (submenuItems) => {
    return submenuItems?.some((submenu) => submenu?.path === activePath);
  };

  // Effect to check and set state based on active submenu path
  useEffect(() => {
    item?.forEach((menu, index) => {
      if (menu?.submenuItems && isAnySubmenuActive(menu?.submenuItems)) {
        setOpenSubmenuIndex(index);
        setOpen(true);
      }
    });
  }, [item, activePath]);

  const toggleSubmenu = (index) => {
    if (openSubmenuIndex === index) {
      setOpenSubmenuIndex(null);
    } else {
      setOpenSubmenuIndex(index);
    }
  };

  return (
    <div
      className={`bg-gray-800 h-full scrollbar-hide text-white font-roboto relative transition-all duration-300 ${
        open ? "w-85" : "w-16"
      }`}
    >
      <BsArrowLeftCircle
        className={`absolute right-3 top-4 z-50 text-xl cursor-pointer border border-black rounded-full ${
          !open && "rotate-180"
        }`}
        onClick={() => setOpen(!open)}
      />

      <ul className="pt-16 bg-gray-800 pl-6 space-y-5">
        {item &&
          item.map((menu, index) => (
            <React.Fragment key={index}>
              <li
                className={`text-base font-bold flex items-center p-2 gap-x-4 cursor-pointer ${
                  menu?.path === activePath
                    ? "bg-gray-700 text-[#ea580c] "
                    : "hover:bg-gray-700 "
                } ${menu?.spacing ? "mt-4" : "mt-3"}`}
                onClick={() => toggleSubmenu(index)}
              >
                <span className="text-lg block">
                  {menu?.icon ? menu?.icon : <MdDashboard />}
                </span>
                <span
                  className={`${!open && "hidden"} transition-all duration-300`}
                >
                  {menu?.path ? (
                    <Link href={menu?.path}>{menu?.title}</Link>
                  ) : (
                    <span>{menu?.title}</span>
                  )}
                </span>
                {menu?.submenu && open && (
                  <MdKeyboardArrowDown
                    className={`${openSubmenuIndex === index && "rotate-180"}`}
                  />
                )}
              </li>

              {menu?.submenu && openSubmenuIndex === index && open && (
                <ul>
                  {menu?.submenuItems &&
                    menu?.submenuItems.map((submenu, subIndex) => {
                      return (
                        <li
                          key={subIndex}
                          className={`text-base text-white flex items-center gap-x-4 cursor-pointer p-2 px-4 ${
                            submenu?.path === activePath
                              ? "bg-gray-700"
                              : "hover:bg-gray-700"
                          } rounded-md mt-2 font-bold`}
                          style={{
                            color: submenu?.path === activePath ? "#ea580c" : "inherit",
                          }}
                        >
                          <span className="text-base">
                            {submenu?.icon ? (
                              submenu?.icon
                            ) : (
                              <MdOutlineKeyboardArrowRight />
                            )}
                          </span>
                          <span>
                            {submenu?.path ? (
                              <Link href={submenu?.path}>{submenu?.title}</Link>
                            ) : (
                              submenu?.title
                            )}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              )}
            </React.Fragment>
          ))}
      </ul>
    </div>
  );
};

export default SidebarItem;
