import React from 'react';

const UnAssignedUser = ({ username }) => {
  return (
    <>
      {username && (
        <div className="flex items-center w-full justify-center min-h-screen bg-gray-50">
          <div className="bg-white p-10 rounded-lg shadow-lg text-center">
            {/* <svg
              className="w-16 h-16 text-red-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v4m0 4h.01"
              ></path>
            </svg> */}
            <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
            <p className="text-md mb-2">Welcome to Autobse Yard Management</p>
            <p className="text-md mb-2">
              You are currently not assigned to any Organisation.
            </p>
            <p className="text-md mb-2">So kindly contact the admin.</p>
            <p className="text-md">Thank You</p>
          </div>
        </div>
      )}
    </>
  );
};

export default UnAssignedUser;
