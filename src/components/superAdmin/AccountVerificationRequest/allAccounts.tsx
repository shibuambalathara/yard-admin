"use client";
import React, { useState, useEffect, useMemo } from "react";
import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { Role, AccountStatus,RoleAliass } from "@/utils/staticData";
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
import { MdOutlineViewHeadline } from "react-icons/md";
import { inputStyle, labelStyle } from "@/components/ui/style";
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
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),

          });
        //   params?.
          if (roleFilter) {
            params.append('role',roleFilter);
          }
         
          if(statusFilter){
            params.append('accountVerification',statusFilter)
          }

    
       
      const response = await axiosInstance.get(
        `/account/users/?${params.toString()}`
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
      cell: ({ row }) => {
        const role = row.original.role;
        return <span>{RoleAliass[role] || role}</span>;
      },
    },
    {
      header: "Account Status",
      accessorKey: "account_verification",
    },

    {
      id: "id",
      header: "View User",
      cell: ({ row }) =><div className="w-20"> {View(row)}</div>
    },
  ];

  const handleOrgChange = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
  };

  const handleStatus=(e)=>{

    const value = e.target.value;

   
    

    setStatusFilter(value)
  }

  // if(isLoading){
  //   return <Loading/>
  // }

  return (
    <div className="w-full space-y-4">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Account Verification Request
      </h1>

      <div className="w-full  space-x-4 flex text-center   ">
        <div className="flex w-full px-4  space-x-10   ">
          <div className="">
            {/* <FilterComponent
              label=""
              name="role"
              options={Role}
              setValue={setRoleFilter}
              placeholder="Select Role"
              defaultValue=""
            /> */}
            <div className="flex flex-col   ">
          {/* <label htmlFor="state" className={labelStyle?.data}>
            Select Role
          </label> */}
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleOrgChange}
          >
            <option value="">All Client</option>
           

            {Role.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
        </div>

          </div>
          <div className="">
            {/* <FilterComponent
              label=""
              name="status"
              options={AccountStatus}
              setValue={setStatusFilter}
              placeholder="Select Status"
              defaultValue=""
            /> */}
             <div className="flex flex-col  ">
        {/* <label htmlFor="state" className={`${labelStyle?.data} text-start`}>
          Status
        </label> */}
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleStatus}
        >
          <option value="">All Status</option>
          {/* <option value="">ALL STATE</option> */}

          {AccountStatus.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
        {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
      </div>
          </div>
        </div>
        </div>

        
      <div className="flex flex-col">
        {/* Conditionally render DataTable if there are users */}
        {filteredData?.data?.totalCount>0 ?(<>
            <DataTable data={UsersData} columns={UsersColumn} />
            <div className="w-full text-center">
              {filteredData?.data?.totalCount >0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData?.data?.totalCount}
                />
              )}
            </div>
          </>):(
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
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
              href={`/accountVerificationRequest/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};