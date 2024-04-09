import React, { useState } from 'react';
import { admin, client_level_super_user, super_admin} from './sidebarlist';
import { GiHamburgerMenu } from 'react-icons/gi';
import { clientLevelUser } from '../sidebar/clientLevelUser';
import SideBarItem from './sidebarItem';
import { BsArrowLeftCircle } from "react-icons/bs";


const SideBar = () => {
  const [userRole, setUserRole] = useState('clientlevelsuperuser');

  const selectSidebarData = () => {
    switch (userRole) {
      case 'admin':
        return admin;
      case 'superadmin':
        return super_admin;
      
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
 <div className='h-screen  '>
  <SideBarItem  item={sidebarData}/>
 </div>

  )

};

export default SideBar;
