"use client";
import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import CreateUserModal from "@/components/superAdmin/UserManagment/createUser";
import { RoleSelect,SelectStatus } from "@/components/commonComponents/role";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser, FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash, FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";
import CreateClientLevelSubOrg from "@/components/clientLevelSuperUser/superUserOrgManagement/clientLevelSubOrg/addSubOrganisation";
import EditClientLevelSubOrg from "@/components/clientLevelSuperUser/superUserOrgManagement/clientLevelSubOrg/editSubOrganisation";
import Pagination from "@/components/pagination/pagination";
import {AccountStatus} from "@/utils/staticData"

const AllClientLevelSubOrganisation = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);



  useEffect(() => {
    if (success) {
      
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

  const fetchSubOrganisation = async () => {
    setIsLoading(true);
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: "10",
            status: "INITIATED",
          });
          //   params?.
        //   if (Category) {
        //     params.append("vehicle_category_id", );
        //   }
        //   if (selectedYard) {
        //     params.append("yard_id", );
        //   }
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_sub_org?${params.toString()}`
      );
      // console.log("all sub org", response);
      setFilteredData(response?.data?.res);
     
    } catch (error) {
     
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  };

  // console.log("filteredData from clientLevelsuperOrg", filteredData);

  useEffect(() => {
    fetchSubOrganisation(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const allSuborganisation = filteredData?.clientLevelSubOrgs
  || [];

  

  const userColumn = useMemo(
    () => [
      {
        header: "Sub Organisation Name",
        accessorKey: "clsub_org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Sub Organisation Category",
        accessorKey: "clsub_org_category.name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Client Organisation",
        accessorKey: "cl_org.cl_org_name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "User",
        accessorKey: "user.name",
        // id: "clsup_org_category_name", // Ensure unique id
      },

      {
        header: "Code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },
      
      
      {
        id: "view",
        header: "Select",
        cell: ({ row }) => (
          <div className="flex justify-center relative z-10">
            <View row={row} />
          </div>
        ),
      },
    ],
    [filteredData]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);



  return (
    <div className="w-full">
    <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
      Sub Organisation Management
    </h1>
    <div className="flex w-full px-8 justify-between ">
      <div className="">
        {/* <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} /> */}
      </div>
      {/* <div className="">
        <SelectStatus options={AccountStatus} setAccountStatus={setAccountStatus} />
      </div> */}
      <div className="w-full flex flex-col space-y-4">
        <div className="self-end">
          <Link
            href={'/superUserOrgManagement/subOrganisation/createSubOrg'}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
            Add 
          </Link>
        </div>
        <div className="w-full relative">
          <div className="absolute top-0 right-10 border shadow-2xl rounded-lg z-50">
            {/* {modalOpen && 
            <CreateClientLevelSubOrg onClose={handleModalClose} fetchData={fetchSubOrganisation} />
            } */}
          </div>
        </div>
      </div>
    </div>
<div className="">

    {/* {editModalOpen && (
        <div className="relative border ">
          <div className="  absolute top-40 right-0  w-full h-full flex items-center justify-end   z-50  border-green-500 ">
          <div className=" w-full   max-w-2xl z-20 ">
            <EditClientLevelSubOrg subOrgId={selectedUserId} onClose={handleEditModalClose} fetchData={fetchSubOrganisation} />
            
          </div>
        </div>
        </div>
      )} */}

      {filteredData?.totalCount>0?(<div>
      <DataTable data={allSuborganisation} columns={userColumn} />
    </div>):(
      <div className="flex flex-col justify-center items-center h-96 p-8">
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
      <span className="text-gray-700 text-md font-semibold mb-2 uppercase">No Sub Organization found </span>
      </div>
    )}

    
</div>
  </div>
  );
};

export default AllClientLevelSubOrganisation;



const View = ({ row }) => {
  return (
    <Link
    
    href={`/superUserOrgManagement/subOrganisation/${row?.original?.id}`}
     target="_blank"
        rel="noopener noreferrer"
     className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white">
     
      <p>
        <MdOutlineViewHeadline />
      </p>
     
       
            <span>  View</span>
      
    </Link>
  );
};
