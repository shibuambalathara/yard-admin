"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { FaChevronDown, FaUserCircle } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import useAuthStore from "@/store/useAuthStore";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const UserDetails = () => {
  const router = useRouter();
  const authStore = useAuthStore();
  const user = authStore.user;
  const token = authStore.token;
  const role = authStore.role;

  const {
    name: userName,
    role: userRole,
    email,
    organisation,
    Type,
  } = user || {};

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = useCallback(() => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleLogout = async () => {
    Cookies.remove("authToken");
    useAuthStore.getState().logout();
    router.push("/login");
  };

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <div className="flex space-x-2 rounded-md px-2 py-2 w-56 justify-between">
        <p
          className={`text-xs font-bold flex items-center transition-transform  duration-150  
   ${
     userName
       ? "transform scale-100 opacity-100 text-black"
       : "transform scale-0 opacity-0 text-gray-500"
   }`}
        >
          <span className="text-slate-500 uppercase">
            {" "}
            {userName && `Welcome , ${userName}`}
          </span>
        </p>
        <button onClick={handleToggle} className="relative group z-10 ">
          <div
            className={`relative flex flex-col overflow-hidden items-center justify-center rounded-full w-[25px] h-[25px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-4 group-focus:ring-2 ring-opacity-30 duration-200 shadow-md ${
              isOpen ? "group-focus:ring-2" : ""
            }`}
          >
            <div
              className={`transform transition-all duration-150 overflow-hidden ${
                isOpen ? "translate-y-1.5" : "-translate-y-2.5"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 animate-bounce text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-between w-[10px] h-[10px] transform transition-all duration-300 origin-center overflow-hidden -translate-y-1.5">
              <div
                className={`bg-white mb-0.75 h-[1px] w-3.5 transform transition-all duration-300 origin-left ${
                  isOpen ? "translate-y-3" : ""
                }`}
              ></div>
              <div
                className={`bg-white mb-0.75 h-[1px] w-3.5 rounded transform transition-all duration-300 ${
                  isOpen ? "translate-y-3 delay-75" : ""
                }`}
              ></div>
              <div
                className={`bg-white h-[1px] w-3.5 transform transition-all duration-300 origin-left ${
                  isOpen ? "translate-y-3 delay-100" : ""
                }`}
              ></div>
            </div>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-20 w-56 mt-3 pt-2 overflow-hidden origin-top-right bg-white rounded-md shadow-xl dark:bg-gray-800 transition-opacity duration-100 ease-out transform scale-100 opacity-100">
          <a className="flex items-center p-3 -mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            <FaUserCircle className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9" />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {userName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {email}
              </p>
            </div>
          </a>

          <hr className="border-gray-200 dark:border-gray-700" />
          {/* <p className="flex font-medium text-xs text-gray-400 px-4 mt-1 uppercase">role:</p> */}
          <p className="block px-4 py-3 text-xs text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
            {userRole}
          </p>
          {organisation && (
            <>
              <p className="block px-4 py-3 text-xs text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white">
                {organisation}
              </p>

              <hr className="border-gray-200 dark:border-gray-700" />
            </>
          )}

          <button
            className="flex w-full items-center px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-red-600 dark:hover:bg-gray-700 dark:hover:text-white hover:text-white"
            onClick={handleLogout}
          >
            Sign Out
            <FiLogOut className="ml-2" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
