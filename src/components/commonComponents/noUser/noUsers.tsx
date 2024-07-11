import React from "react";
import img from "../../../../public/no-user.png"
import Image from 'next/image'; // Assuming next/image is correctly imported

const getRoleLabel = (roleValue) => {
  switch (roleValue) {
    case "SUPER_ADMIN":
      return "Super Admin";
    case "YARD_MANAGER":
      return "Yard Manager";
    case "CLIENT_LEVEL_SUPER_USER":
      return "Client Level Super User";
    case "CLIENT_LEVEL_USER":
      return "Client Level User";
    case "CLIENT_LEVEL_SUB_USER":
      return "Client Level Sub User";
    default:
      return "Unknown Role";
  }
};

const NoUsersMessage = ({ roleFilter, statusFilter="" }) => {

  if (roleFilter === "" || statusFilter === "") {
    return (
      <div className="flex flex-col justify-center items-center h-96 p-8 mt-10">
        <svg
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M7 7V3a1 1 0 0 1 1-1h13a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-4v3.993c0 .556-.449 1.007-1.007 1.007H3.007A1.006 1.006 0 0 1 2 20.993l.003-12.986C2.003 7.451 2.452 7 3.01 7H7zm2 0h6.993C16.549 7 17 7.449 17 8.007V15h3V4H9v3zm-.497 11l5.656-5.657-1.414-1.414-4.242 4.243L6.38 13.05l-1.414 1.414L8.503 18z" />
          </g>
        </svg>
        <p className="text-gray-500 text-md mt-4 flex items-center">
          <span className="font-bold text-lg font-poppins upper shadow-2xl">
          Please select user role {statusFilter &&statusFilter }
          </span>
        </p>
      </div>
    );
  }
  const roleLabel = getRoleLabel(roleFilter);

  return (
    <div className="flex flex-col justify-center items-center h-96 p-8 ">
      <div className="mb-6">
        <svg
          className="w-16 h-16 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-3l4-8v8h3l-3 4z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"
          ></path>
        </svg>




      </div>
      <div className="flex">
      <p className="text-gray-700 text-md font-semibold mb-2 uppercase flex">
        No users for <span className="font-bold ml-2">{roleLabel}
          
          </span> 
          
         
      </p>
      {statusFilter !=='Status' &&statusFilter &&(< div className="flex"><p className="text-gray-700 text-md font-semibold mb-2 uppercase ml-2"> with status{" "}</p>
        <span className="font-bold ml-2">{statusFilter}</span>{" "}</div>)}
        </div>
      <p className="text-gray-500 text-md mt-4">
      Try adjusting your filters or adding new users  
      </p>
    </div>
    
  );
};

export default NoUsersMessage;
