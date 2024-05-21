"use client";

import React, { useState } from 'react';
import { admin, client_level_super_user, super_admin,yardManager} from './sidebarlist';
import { GiHamburgerMenu } from 'react-icons/gi';

import SideBarItem from './sidebarItem';
import { BsArrowLeftCircle } from "react-icons/bs";
import useAuthStore from '../../store/useAuthStore';


const SideBar = () => {
  // const { user,token,role } = useAuthStore();

  // console.log("role from sidebar",role);
  const [userRole, setUserRole] = useState('superadmin');
 
  const token = useAuthStore.getState().token; // Get token from the Zustand auth store

// console.log("Token form sidebar",token);

  const selectSidebarData = () => {
    switch (userRole) {
      case 'admin':
        return admin;
      case 'superadmin':
        return super_admin;
        case 'yardmanager':
        return yardManager;
      
      case 'clientlevelsuperuser':
        return client_level_super_user;
      default:
        return admin; // Default to user data
    }
  };

  const sidebarData = selectSidebarData();

;


  return(
 <div className=' h-full'>
  
  <SideBarItem  item={sidebarData}/>

 </div>

  )

};

export default SideBar;
