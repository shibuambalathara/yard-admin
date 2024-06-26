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
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [clientLevelUsers, setClientLevelUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [allClientcategory, setAllClientCategory] = useState([]);
  const [accountStatus,setAccountStatus]=useState()


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
      console.log("all sub org", response);
      setFilteredData(response?.data?.res);
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
        id: "viewUser",
        header: "View User",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };

  return (
    <div className="w-full">
    <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
      Organisation Management
    </h1>
    <div className="flex w-full px-8 justify-between ">
      <div className="">
        <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} />
      </div>
      {/* <div className="">
        <SelectStatus options={AccountStatus} setAccountStatus={setAccountStatus} />
      </div> */}
      <div className="w-full flex flex-col space-y-4">
        <div className="self-end">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add ORG
          </button>
        </div>
        <div className="w-full relative">
          <div className="absolute top-0 right-10 border shadow-2xl rounded-lg z-50">
            {modalOpen && <CreateClientLevelSubOrg onClose={handleModalClose} fetchData={fetchSubOrganisation} />}
          </div>
        </div>
      </div>
    </div>
<div className="">
{/* {editModalOpen && (
      <div className="relative border ">
        <div className="  absolute top-40 right-0  w-full h-full flex items-center justify-end   z-50  border-green-500 ">
        <div className=" w-full   max-w-sm z-20 ">
          <EditIndividualOrg userId={selectedUserId} onClose={handleEditModalClose} fetchData={fetchSubOrganisation} />
          
        </div>
      </div>
      </div>
    )} */}
<div>
      <DataTable data={allSuborganisation} columns={userColumn} />
    </div>
    
</div>
  </div>
  );
};

export default AllClientLevelSubOrganisation;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/organisationManagement/clientLevelSubOrg/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
