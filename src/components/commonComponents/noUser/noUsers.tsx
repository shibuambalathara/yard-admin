import React from 'react';

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

const NoUsersMessage = ({ roleFilter, statusFilter }) => {
  const roleLabel = getRoleLabel(roleFilter);

  return (
    <div className="flex flex-col justify-center items-center h-96 p-8 ">
      <div className="mb-6">
        <svg className="w-16 h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-3l4-8v8h3l-3 4z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"></path>
        </svg>
      </div>
      <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
        No users for <span className='font-bold'>{roleLabel}</span>  with status  <span className='font-bold'>{statusFilter}</span>      </p>
      <p className="text-gray-500 text-md mt-4">Try adjusting your filters or adding new users.</p>
    </div>
  //   <div className="flex flex-col justify-center items-center h-96 p-8 ">
  //   <div className="flex flex-col border  rounded-md  shadow-sm p-10 justify-center   ">
  //   <div className="mb-6  flex justify-center items-center ">
  //     <svg className="w-16 h-16 flex justify-center text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-3l4-8v8h3l-3 4z"></path>
  //       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 20c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z"></path>
  //     </svg>
  //   </div>
  //   <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
  //     No users for <span className='font-bold'>{roleLabel}</span>  with status  <span className='font-bold'>{statusFilter}</span>      </p>
  //   <p className="text-gray-500 text-md  text-center mt-4">Try adjusting your filters or adding new users.</p>
  //   </div>
  // </div>
  );
};

export default NoUsersMessage;
