"use client";
import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import CreateUserModal from "@/components/superAdmin/UserManagment/createUser";
import { RoleSelect } from "@/components/commonComponents/role";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser, FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash, FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";
import CreateClientLevelOrg from "@/components/clientLevelSuperUser/superUserOrgManagement/clientLevelOrganisation/addOrganisation";
import EditIndividualOrg from "@/components/clientLevelSuperUser/superUserOrgManagement/clientLevelOrganisation/editOrganisation";
import Pagination from "@/components/pagination/pagination";

const AllOrganisation = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [limit,setLimit]=useState(5)
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

  const fetchAllOrg = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_org?page=${page}&limit=5&status=1&client_org_level=CLIENT_ORG`
      );
      console.log("all ORGS", response);
      setFilteredData(response?.data?.res)
      
    } catch (error) {
     
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  };

   
  
 



  // console.log("filteredData from clientLevelsuperOrg", filteredData);

  useEffect(() => {
    fetchAllOrg(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const allClientLevelOrg = filteredData?.clientLevelOrg || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Organization Name",
        accessorKey: "cl_org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Organization Category",
        accessorKey: "cl_org_category.name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "state",
        accessorKey: "state",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "user",
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
        cell: ({ row }) => (
          <div className="flex justify-center relative z-10">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
      },
    ],
    [filteredData]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);

//   const handleModalOpen = () => {
//     setModalOpen(true);
//   };

//   const handleModalClose = () => {
//     setModalOpen(false);
//   };

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
      <div className="flex w-full px-8 justify-between">
        <div className="">
          {/* <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} /> */}
        </div>
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
              {modalOpen && 
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
              <CreateClientLevelOrg onClose={handleModalClose} fetchData={fetchAllOrg} />
            </div>
              }
          </div>
        </div>
      </div>
  <div className="">
  {editModalOpen && (
        <div className="relative border ">
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">

            <EditIndividualOrg userId={selectedUserId} onClose={handleEditModalClose} fetchData={fetchAllOrg} />
            
          </div>
        </div>
      )}
  <div>
        <DataTable data={allClientLevelOrg} columns={userColumn} />
      </div>
      
  </div>
    </div>
  );
};

export default AllOrganisation;

const View = ({ row, onEditClick }) => {
  return (
    <div
    onClick={() => onEditClick(row.original.id)}
     className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white">
      {/* <div className="flex flex-col justify-center items-center bg-red-500"> */}
      <p>
        <MdOutlineViewHeadline />
      </p>
      {/* <button
       
        className=" "
      > */}
       
            <span>  View User</span>
      {/* </button> */}
      {/* </div> */}
    </div>
  );
};
