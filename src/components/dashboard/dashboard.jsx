"use client"

import React, { useState } from 'react'
import useAuthStore from "../../store/useAuthStore";
import UnAssginedUser from "@/components/commonComponents/unAssignedUser/unAssignedUser"
import { useRouter } from 'next/navigation';


const Dashboard = () => {
  
    const { user,token,role } = useAuthStore();
    const router=useRouter()


    if( user?.role !=="SUPER_ADMIN" &&  user?.organisation==null){
      return<UnAssginedUser username={user?.name} />
    }else if (user?.role !=="SUPER_ADMIN" &&  user?.organisation) {
      router.push("/")
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