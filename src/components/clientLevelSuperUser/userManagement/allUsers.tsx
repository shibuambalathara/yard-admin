"use client";
import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role, SuperUserChildren,UserStatus } from "@/utils/staticData";
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
import CreateUser from "@/components/clientLevelSuperUser/userManagement/createUser";
import EditIndividualUser from "@/components/clientLevelSuperUser/userManagement/editUser";



const UserManagement = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [accountStatus,setAccountStatus]=useState(1)

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

  const fetchAllUsers = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user/users/created_by_ins?page=1&limit=5&status=${accountStatus}&role=${roleFilter}`
      );
      console.log("all users created by super user", response);
      setFilteredData(response.data?.res);
     
    } catch (error) {
      
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("role filter", roleFilter);

  useEffect(() => {
    fetchAllUsers(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.users || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
        id: "name", // Ensure unique id
      },
      {
        header: "Email",
        accessorKey: "email",
        id: "email", // Ensure unique id
      },
      {
        header: "Role",
        accessorKey: "role",
        id: "role", // Ensure unique id
      },
      {
        header: "Code",
        accessorKey: "code",
        id: "code", // Ensure unique id
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

  console.log("user status",accountStatus);
  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        User Management
      </h1>
      <div className="flex w-full px-8 justify-between">
    <div className="w-full  flex justify">
    <div className="">
          <RoleSelect roleOptions={SuperUserChildren} setRoleFilter={setRoleFilter} />
        </div>
        {/* <div className="">
        <SelectStatus options={UserStatus} setAccountStatus={setAccountStatus} />
      </div> */}
    </div>
        <div className="w-full flex flex-col space-y-4">
          <div className="self-end">
            <button
              onClick={handleModalOpen}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Add User
            </button>
          </div>
          <div className="w-full relative">
            <div className="absolute top-0 right-0 border shadow-2xl rounded-lg z-50">
              {modalOpen && <CreateUser onClose={handleModalClose} fetchData={fetchAllUsers} />}
            </div>
          </div>
        </div>
      </div>
  <div className="">
  {editModalOpen && (
        <div className="relative">
          <div className=" mt-20 absolute top-0 right-0 w-full h-full flex items-center justify-end p-4  z-50 border border-black">
          <div className=" w-full  p-4 max-w-2xl z-20">
            <EditIndividualUser userId={selectedUserId} onClose={handleEditModalClose} fetchData={fetchAllUsers} />
            
          </div>
        </div>
        </div>
      )}
  <div>
        <DataTable data={UsersData} columns={userColumn} />
      </div>
      
  </div>
    </div>
  );
};

export default UserManagement;

const View = ({ row, onEditClick }) => {
  return (
    <div className="flex justify-center items-center  py-1 px-3 space-x-1 text-white rounded-md z-[-10]">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <button
        onClick={() => onEditClick(row.original.id)}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        View User
      </button>
    </div>
  );
};
