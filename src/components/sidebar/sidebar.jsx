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

  // return (
  //   <div className={`bg-gray-800 min-h-screen text-green-300 font-roboto relative transition-all duration-300 ${open ? 'w-96' : 'w-20'}`}>
  //     <BsArrowLeftCircle 
  //       className={`absolute right-3 top-4  z-50 text-xl cursor-pointer border w- border-black rounded-full ${!open && `rotate-180`}`}
  //       onClick={() => setOpen(!open)}
  //     />

  //     <div className="p-4 pt-20 space-y-4 transition-all duration-500">
  //       {sidebarData.map((item, index) => (
  //         <SideBarItem key={index} item={item} open={open} setOpen={setOpen}/>
  //       ))}
  //     </div>
  //   </div>
  // );


  return(
 <div className=' h-full'>
  
  <SideBarItem  item={sidebarData}/>

 </div>

  )

};

export default SideBar;
