"use client";
import React, { useState, useEffect, useMemo } from "react";
import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { Role, AccountStatus } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
import Link from "next/link";
import Pagination from "@/components/pagination/pagination";
import toast from "react-hot-toast";
import NoUsersMessage from "@/components/commonComponents/noUser/noUsers";
import {SelectComponent} from "@/components/ui/fromFields"
import Loading from "@/app/(home)/(superAdmin)/loading";
const AccountVerificationRequests = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("SUPER_ADMIN");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (success) {
      toast.success(success.text ? success.text : "Success");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(
        error.text ? error.text : "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/account/users?page=${page}&limit=10&accountVerification=${statusFilter}&role=${roleFilter}`
      );
      console.log("response of acc",response);
      
      setFilteredData(response.data);
      setSuccess({
        text: response?.data?.message,
      });
    } catch (error) {
      setError({
        text: error?.response?.data?.message,
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("filteredData",filteredData);
  

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, statusFilter, page]);

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

  // if(isLoading){
  //   return <Loading/>
  // }

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Account Verification Request
      </h1>

      <div className="w-1/2 space-x-4 flex text-center  mx-4 items-center  ">
        <div className="flex flex-col space-y-2 w-1/2">
          <label
            htmlFor="role-select"
            className="font-roboto font-semibold text-lg text-gray-700"
          >
            Role
          </label>
          <select
            id="role-select"
            className="px-3 py-2 rounded-md shadow-sm focus:outline-none  border"
            onChange={(e) => setRoleFilter(e.target.value)}
            // defaultValue="DFADF"
          >
            <option value="" disabled hidden >
          Select Role
        </option>
            {Role.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2 w-1/2">
          <label
            htmlFor="status-select"
            className="font-roboto font-semibold text-lg text-gray-700"
          >
            Status
          </label>
          <select
            id="status-select"
            className="px-3 py-2 rounded-md shadow-sm focus:outline-none  border"
            onChange={(e) => setStatusFilter(e.target.value)}
            // defaultValue="DFADF"

          >
             <option value="" disabled hidden >
          Select Status
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
  {/* Conditionally render DataTable if there are users */}
  {filteredData?.data?.totalCount > 1 ? (
    <>
      <DataTable data={UsersData} columns={UsersColumn} />
      <div className="w-full text-center">
        {filteredData?.data?.totalCount && (
          <Pagination
            page={page}
            setPage={setPage}
            totalDataCount={filteredData?.data?.totalCount}
          />
        )}
      </div>
    </>
  ) : (
    // Render NoUsersMessage if there are no users
    <div>
      <NoUsersMessage roleFilter={roleFilter} statusFilter={statusFilter} />
    </div>
  )}
</div>

    </div>
  );
};

export default AccountVerificationRequests;

const View = (row) => {
  // console.log("view", row);
  return (
    <div>
     
      <Link href={`/accountVerificationRequest/${row.original.id}`} target="_blank" rel="noopener noreferrer">
     View
      </Link>
    </div>
  );
};
