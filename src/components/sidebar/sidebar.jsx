"use client";

import React, { useEffect, useState } from "react";
import {
  client_level_super_user,
  Super_Admin,
  yardManager,
  clientLevelUser,
  clientLevelSuperUser,
  clientLevelSubUser,
  RepoUser,
  RepoAdmin,
} from "./sidebarlist";
import { GiHamburgerMenu } from "react-icons/gi";

import SideBarItem from "./sidebarItem";
import { BsArrowLeftCircle } from "react-icons/bs";
import useAuthStore from "../../store/useAuthStore";
// import { headers } from "next/headers";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const { user, token, role } = useAuthStore();
  useEffect(() => {
    // Code in this section runs on mount
    console.log("Component mounted in sidebar");

    // Return a function to run when the component unmounts
    return () => {
      console.log("Component unmounted in sidebar");
    };
  }, []); 

  const selectSidebarData = () => {
    switch (role) {
      case "SUPER_ADMIN":
        return Super_Admin;
      case "YARD_MANAGER":
        return yardManager;
      case "CLIENT_LEVEL_USER":
        return clientLevelUser;
      case "CLIENT_LEVEL_SUPER_USER":
        return clientLevelSuperUser;
      case "CLIENT_LEVEL_SUB_USER":
        return clientLevelSubUser;
      case "REPO_ADMIN":
        return RepoAdmin;
      case "REPO_USER":
        return RepoUser;
      // default:
      //   return RepoUser;

      // Default to user data
    }
  };
  const pathname = usePathname();

  const modifiedPathname = pathname.replace(/\/[cC][a-zA-Z0-9_-]{23,}.*$/, "");

  const sidebarData = selectSidebarData();


  return (
    <div className=" h-full">
      <SideBarItem item={sidebarData} activePath={modifiedPathname} />
    </div>
  );
};

export default SideBar;





















