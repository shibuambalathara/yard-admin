"use client"

import React from 'react'
import useAuthStore from "../../store/useAuthStore";


const Dashboard = () => {
    const { user,token,role } = useAuthStore();

    const selectSidebarData = () => {
        switch (role) {
          case "SUPER_ADMIN":
            return  "SUPER ADMIN";
          case "YARD_MANAGER":
            return "YARD MANAGER";
          case "CLIENT_LEVEL_USER":
            return "CLIENT LEVEL USER";
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