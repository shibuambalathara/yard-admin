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
  RepoAdmin
} from "./sidebarlist";
import { GiHamburgerMenu } from "react-icons/gi";

import SideBarItem from "./sidebarItem";
import { BsArrowLeftCircle } from "react-icons/bs";
import useAuthStore from "../../store/useAuthStore";
// import { headers } from "next/headers";
import { usePathname } from 'next/navigation';


const SideBar = () => {
  
  const { user,token,role, } = useAuthStore();

  // console.log("user  form sidebar",user);
  // console.log("1234566789");
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
          default :
          return RepoUser
        
      // Default to user data
    }
  };
  const pathname = usePathname();
  // console.log("pathname",pathname);
  // const modifiedPathname = pathname.replace(/\/[cC][a-zA-Z0-9_-]{7,}$/, '');
  // const modifiedPathname = pathname.replace(/\/[cC][a-zA-Z0-9_-]{23,}$/, '');
  const modifiedPathname = pathname.replace(/\/[cC][a-zA-Z0-9_-]{23,}.*$/, '');
  // REPO_ADMIN


  // console.log('modifiedPathname', modifiedPathname);

  // console.log("1234566789");
  const sidebarData = selectSidebarData();

  // console.log("selecteed sidebardata",sidebarData);

  return (
    <div className=" h-full">
      <SideBarItem item={sidebarData} activePath={modifiedPathname} />
    </div>
  );
};

export default SideBar;
