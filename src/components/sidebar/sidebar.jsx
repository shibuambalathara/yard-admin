"use client";

import React, { useState } from "react";
import {
  client_level_super_user,
  Super_Admin,
  yardManager,
} from "./sidebarlist";
import { GiHamburgerMenu } from "react-icons/gi";

import SideBarItem from "./sidebarItem";
import { BsArrowLeftCircle } from "react-icons/bs";
import useAuthStore from "../../store/useAuthStore";

const SideBar = () => {
  const { user,token,role } = useAuthStore();

  console.log("user role form sidebar",role);

  const selectSidebarData = () => {
    switch (role) {
      case "SUPER_ADMIN":
        return Super_Admin;
      case "YARD_MANAGER":
        return yardManager;

      case "clientlevelsuperuser":
        return client_level_super_user;
      // Default to user data
    }
  };

  const sidebarData = selectSidebarData();

  return (
    <div className=" h-full">
      <SideBarItem item={sidebarData} />
    </div>
  );
};

export default SideBar;
