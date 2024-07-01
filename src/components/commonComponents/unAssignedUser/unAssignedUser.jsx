import React from 'react';

const UnAssignedUser = ({ username }) => {
  return (
    <div className="flex items-center w-full justify-center min-h-screen ">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-4">Hi {username},</h1>
        <p className="text-md mb-2">Welcome to Autobse Yard Management</p>
        <p className="text-md mb-2">
        You are currently not assigned to any organization. </p>
        <p className="text-md">So kindly contact the admin.</p>
      </div>
    </div>
  );
};

export default UnAssignedUser;
