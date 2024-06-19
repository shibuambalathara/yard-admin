"use client";

import React, { useEffect, useState } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const router = useRouter();
  const authStore = useAuthStore(); // Explicitly define the type here
  const user = authStore.user;
  const token = authStore.token;
  const role = authStore.role;

  const userName = user && user.name;
  const userRole = user && user.role;

  // console.log("User from useAuthStore():", userName);
  // console.log("Type of user from useAuthStore():", userRole);

  // useEffect(()=>{
  //   const userName = localStorage.getItem('user');
  //   const userRole = localStorage.getItem('role');
  // setUsers(userName)
  // setRole(userRole)
  // },[])

  const handleLogout = async () => {
    // console.log("Entered in logout function");

    // Remove the authentication cookie
    Cookies.remove("authToken");

    // Call logout function from useAuthStore to clear the state and persisted data
    useAuthStore.getState().logout();

    // console.log("Finished in logout function");

    // Redirect to the login page
    router.push("/login");
  };

  return (
    <div className="flex border-2 space-x-2 rounded-md px-2 py-2">
      <FaUserCircle size="2em" />
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className=" flex flex-col avatar">
          <p className="text-xs font-bold flex  items-center ">
            {userName}{" "}
            <span className="pl-2 ">
              <FaChevronDown />
            </span>
          </p>
          <p className="text-xs">{userRole}</p>
        </button>
        <ul
          tabIndex={0}
          className="mt-3  shadow menu menu-compact dropdown-content  rounded-md w-52 bg-red-500 text-white"
        >
          <>
            <li>
              <button className=" font-bold  " onClick={handleLogout}>
                Logout{" "}
                <span>
                  <FiLogOut />
                </span>
              </button>
            </li>
            {/* <li>
              <button className=" font-bold  " onClick={handleLogout}>
                Logout{" "}
                <span>
                  <FiLogOut />
                </span>
              </button>
            </li>
            <li>
              <button className=" font-bold  " onClick={handleLogout}>
                Logout{" "}
                <span>
                  <FiLogOut />
                </span>
              </button>
            </li> */}
          </>
        </ul>
      </div>
    </div>




  );
};

export default UserDetails;

<>
{/* <div className="flex border-2 space-x-2 rounded-md px-2 py-2">
<FaUserCircle size="2em" />
<div className="dropdown dropdown-end">
  <button
    tabIndex={0}
    className="flex flex-col avatar"
    onClick={toggleDropdown}
  >
    <p className="text-xs font-bold flex items-center">
      {userName}
      <span className="pl-2">
        <FaChevronDown />
      </span>
    </p>
    <p className="text-xs">{userRole}</p>
  </button>
  {isDropdownOpen && (
    <ul
      tabIndex={0}
      className="mt-3 shadow menu menu-compact dropdown-content rounded-md w-52 bg-gray-100 text-black"
    >
      <>
        
        <li>
          <a href="#profile" className="font-bold">
            Profile
          </a>
        </li>
        <li>
          <a href="#settings" className="font-bold">
            Settings
          </a>
        </li>
        <li>
          <button className="font-bold" onClick={handleLogout}>
            Logout{" "}
            <span>
              <FiLogOut />
            </span>
          </button>
        </li>
      </>
    </ul>
  )}
</div>
</div> */}</>