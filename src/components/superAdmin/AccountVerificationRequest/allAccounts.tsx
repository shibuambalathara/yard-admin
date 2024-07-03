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
import { SelectComponent } from "@/components/ui/fromFields";
import Loading from "@/app/(home)/(superAdmin)/loading";
import {
  RoleSelect,
  FilterComponent,
} from "@/components/commonComponents/role";
const AccountVerificationRequests = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
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
        `/account/users?page=${page}&limit=${limit}&accountVerification=${statusFilter}&role=${roleFilter}`
      );
      console.log("response of account", response);

      setFilteredData(response.data);
      // setSuccess({
      //   text: response?.data?.message,
      // });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("filteredData",filteredData);

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

      <div className="w-full  space-x-4 flex text-center  mx-4 items-center  ">
        <div className="flex w-full px-8  space-x-10 items-center  ">
          <div className="">
            <FilterComponent
              label=""
              name="role"
              options={Role}
              setValue={setRoleFilter}
              placeholder="Select Role"
              defaultValue=""
            />
          </div>
          <div className="">
            <FilterComponent
              label=""
              name="status"
              options={AccountStatus}
              setValue={setStatusFilter}
              placeholder="Select Status"
              defaultValue=""
            />
          </div>
        </div>
        </div>

        
      <div className="flex flex-col">
        {/* Conditionally render DataTable if there are users */}
        {filteredData?.data?.totalCount > 0 ? (
          <>
            <DataTable data={UsersData} columns={UsersColumn} />
            <div className="w-full text-center">
              {filteredData?.data?.totalCount && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData?.data?.totalCount}
                />
              )}
            </div>
          </>
        ) : (
          // Render NoUsersMessage if there are no users
          <div>
            <NoUsersMessage
              roleFilter={roleFilter}
              statusFilter={statusFilter}
            />
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
      <Link
        href={`/accountVerificationRequest/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </Link>
    </div>
  );
};
