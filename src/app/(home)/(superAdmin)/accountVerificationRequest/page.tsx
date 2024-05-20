"use client";

import React, { useState, useEffect, useMemo } from "react";
import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { Role, AccountStatus } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
import Link from "next/link";
import DataTableid from "@/components/idAcess/idAccess";
import Pagination from "@/components/pagination/pagination";

const AccountVerificationRequest = () => {
  const [roleFilter, setRoleFilter] = useState("YARD_MANAGER");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [filteredData, setFilteredData] = useState(null);

  // console.log('roleFilter',roleFilter);
  // console.log('statusFilter',statusFilter);
  // // console.log();
const[page,setPage]=useState(1)

// const fetchData = () => {
//   console.log('hit 1');
  
//   axiosInstance
//     .get(`/account/users?page=${page}&limit=10&accountVerification=${statusFilter}&role=${roleFilter}`)
//     .then(response => {
//       console.log('hit 2');
      
//       setFilteredData(response.data);
//     })
//     .catch(error => {
//       console.log('hit 3');
      
//       console.error("Error fetching data:", error);
//     });
// };
// console.log("page",page)

const fetchData = async () => {
  try {
    const response = await axiosInstance.get(`/account/users?page=${page}&limit=10&accountVerification=${statusFilter}&role=${roleFilter}`);
    setFilteredData(response.data);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};


  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, statusFilter,page]);

  // console.log("data", filteredData);

  const UsersData = filteredData?.data?.users || [];


  const UsersColumn = [
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Role",
      accessorKey: "role",
    },
    {
      header: "Account Status",
      accessorKey: "account_verification",
    },
    
    {
      id: "id",
      header: "View User",
      cell: ({ row }) => View(row),
     
    },
  ];



 
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Account Verification Request
      </h1>
      <div className="w-1/2 border flex text-center space-y-2 mx-4">
        <div className="flex flex-col">
          <label
            htmlFor="bid-status"
            className="font-roboto font-semibold text-lg"
          >
            Select by Role
          </label>
          <select
            id="bid-status"
            className="px-2 py-1 border-2"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option disabled value="">
              select a client
            </option>
            {Role.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label
            htmlFor="bid-status"
            className="font-roboto font-semibold text-lg"
          >
            Select by Status
          </label>
          <select
            id="bid-status"
            className="px-2 py-1 border-2"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option disabled value="">
              select Status
            </option>
            {AccountStatus.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col">
        <DataTable data={UsersData} columns={UsersColumn} />
      <div className=" w-full text-center">  
{/* { filteredData?.data?.totalCount   &&    <Pagination page={page} setPage={setPage} totalDataCount={filteredData?.data?.totalCount} />
}       */}
  </div>
      </div>
    </div>
  );
};

export default AccountVerificationRequest;

const View = (row) => {
  // console.log("view", row);
  return (
    <div>
      <Link href={`/accountVerificationRequest/${row.original.id}`}>View</Link>
    </div>
  );
};
