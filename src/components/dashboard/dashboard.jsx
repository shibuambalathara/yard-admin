"use client"

import React, { useState } from 'react'
import useAuthStore from "../../store/useAuthStore";
import UnAssginedUser from "@/components/commonComponents/unAssignedUser/unAssignedUser"


const Dashboard = () => {
  // const [userOrganisation, setUserOrganisation]=useState(null)
    const { user,token,role } = useAuthStore();
    console.log("user form home page",user);

    // const {organisation}=user
    // // setUserOrganisation(organisation)
    // // const {name}=user

    // console.log("org form home",organisation,);
    // // console.log("userOrganistion",userOrganisation);

    if( user?.role !=="SUPER_ADMIN" &&  user?.organisation==null){
      return<UnAssginedUser username={user?.name} />
    }

    const selectSidebarData = () => {
        switch (role) {
          case "SUPER_ADMIN":
            return  "SUPER ADMIN";
          case "YARD_MANAGER":
            return "YARD MANAGER";
          case "CLIENT_LEVEL_USER":
            return "CLIENT LEVEL USER";
            case "CLIENT_LEVEL_SUB_USER":
            return "CLIENT LEVEL SUB USER";
          case "CLIENT_LEVEL_SUPER_USER":
            return "CLIENT LEVEL SUPER USER";
        //   Default to user data
        }
      };
    
      const UserLogedIn=selectSidebarData()

   

  return (
    <div>  WELCOME TO <span className='font-bold'>{UserLogedIn}</span> DASHBOARD </div>
  )
}

export default Dashboard