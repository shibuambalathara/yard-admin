// import AccountVerificationRequest from "@/components/superAdmin/tables/AccountVerificationRequest"




// const AccountVerificationRequests = () => {
//   return (
//     <div><AccountVerificationRequest/></div>
//   )
// }

// export default AccountVerificationRequests
"use client";

import React, { useState, useEffect, useMemo } from 'react';
import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"
import { Role, AccountStatus } from '@/utils/staticData';
import axiosInstance from '@/utils/axios';
import Link from 'next/link';

const AccountVerificationRequest =  () => {
  const [roleFilter, setRoleFilter] = useState('YARD_MANAGER');
  const [statusFilter, setStatusFilter] = useState('PENDING');
  const [filteredData, setFilteredData] = useState(null);

  // console.log('roleFilter',roleFilter);
  // console.log('statusFilter',statusFilter);
  // // console.log();
  

  const fetchData = async () => {


    try {
      const response = await axiosInstance.get(`/account/users?page=1&limit=5&accountVerification=${statusFilter}&role=${roleFilter}`);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  
  useEffect(() => {
    
    fetchData(); // Call fetchData directly inside useEffect

  }, [roleFilter, statusFilter]);

  console.log("data", filteredData);
  

  const UsersData =  filteredData?.data?.users || []

  // function View({ userId }) {
  //   console.log("view", userId);
  //   return (
  //     <div>
  //       <Link href={`/${userId}`}>
  //         <a target="_blank">
  //           <div>
  //             <span className=" bg-primary-hover font-semibold border text-white py-1 w-full px-6 rounded-lg">View User</span>
  //           </div>
  //         </a>
  //       </Link>
  //     </div>
  //   );
  // }

  const UsersColumn = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Email',
      accessorKey: 'email',
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
    {
      header: 'Account Status',
      accessorKey: 'account_verification', // Corrected typo
    },
    // {
    //   header: 'View User',
    //   accessorKey: 'id',
    //   // Cell: ({ cell: { value } }) => View (value)
       
    // }
    
   
    {
      header: 'View User',
      accessorKey: 'id',
      Cell: ({ cell: { value } }) => (
        <button onClick={() => console.log("View user", value)}>
          View User
        </button>
      ),
    }
    
    
  ];
  
  
 
  


  return (
    <div className='w-full'>
      <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>Account Verification Request</h1>
      <div className="w-1/2 border flex text-center space-y-2 mx-4">
        <div className='flex flex-col'>
          <label htmlFor="bid-status" className="font-roboto font-semibold text-lg">Select by Role</label>
          <select id="bid-status" className="px-2 py-1 border-2" onChange={(e) => setRoleFilter(e.target.value)}>
            <option disabled value="">select a client</option>
            {Role.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-col'>
          <label htmlFor="bid-status" className="font-roboto font-semibold text-lg">Select by Status</label>
          <select id="bid-status" className="px-2 py-1 border-2" onChange={(e) => setStatusFilter(e.target.value)}>
            <option disabled value="">select Status</option>
            {AccountStatus.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <DataTable data={UsersData} columns={UsersColumn} />
      </div>
    </div>
  );
};

export default AccountVerificationRequest;

const  View=({ userId })=> {
  console.log("view", userId);
  return (
    <div>
      <Link href={`/${userId}`}>
        <a target="_blank">
          <div>
            <span className=" bg-primary-hover font-semibold border text-white py-1 w-full px-6 rounded-lg">View User</span>
          </div>
        </a>
      </Link>
    </div>
  );
}