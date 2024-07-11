"use client";
import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role, SuperUserChildren,RoleAliass, UserStatus } from "@/utils/staticData";
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
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoUsersMessage from "@/components/commonComponents/noUser/noUsers";



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
  const [statusFilter, setStatusFilter] = useState(null);
  const [limit,setLimit]=useState(5)
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
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),

      });

      if (roleFilter!==''&&roleFilter) {
        params.append('role',roleFilter);
      }
      if(accountStatus){
        params.append('status',accountStatus.toString());

      }
      const response = await axiosInstance.get(
        `/user/users/created_by_ins?${params.toString()}`
      );
      // console.log("all users created by super user", response);
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
  }, [roleFilter, page,accountStatus]);

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
        cell: ({ row }) => {
          const role = row.original.role;
          return <span>{RoleAliass[role] || role}</span>;
        },
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
          <div className="  flex justify-center items-center">
            <View row={row} />
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

  const handleRoleChange = (e) => {
   
    setRoleFilter(e.target.value);
  };
  const handleStatus = (e) => {
    
    setAccountStatus(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setStatusFilter(selectedOption.text);
  };

  console.log("user status",accountStatus);
  
  return (
    <div className="w-full h-screen border-green-600">

      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        User Management
      </h1>

      <div className="flex w-full px-5 justify-between items-center">

    <div className="w-full  flex justify mr-4 gap-8">
    <div className="flex flex-col   ">
          <label htmlFor="state" className={labelStyle?.data}>
           Select Role
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleRoleChange}
          >
            <option value='' >All Roles</option>
           

            {SuperUserChildren.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
        </div>
        <div className="flex flex-col mr-16  ">
        <label htmlFor="state" className={labelStyle?.data}>
        Select Status
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleStatus}
        >
          
          <option value="">Status</option>

          {UserStatus.map((option, index) => (
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

      <div>
        {/* <div className="">
        <SelectStatus options={UserStatus} setAccountStatus={setAccountStatus} />
      </div> */}
    </div>

        <div className="w-full flex flex-col mt-3 ">
          <div className="self-end">
            <Link
            href={"/userCreation/create"}
              // onClick={handleModalOpen}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
            >
              Add 
            </Link>
          </div>
          <div className="w-full relative border-red-800 ">
          {/* {modalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                  <CreateUser onClose={handleModalClose} fetchData={fetchAllUsers} />
              </div>
            )} */}
          </div>
        </div>

      </div>
      {filteredData?.totalCount > 0 ? (
         
            <DataTable data={UsersData} columns={userColumn} />
          
        ) : (
          <NoUsersMessage
              
              roleFilter={roleFilter}
              statusFilter={statusFilter}
              

            />
        )}
      
  </div>
  
  );
};

export default UserManagement;

const View = ({ row }) => {
  return (
    <Link
    
    href={`/userCreation/${row?.original?.id}`}
     target="_blank"
        rel="noopener noreferrer"
     className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white">
     
      <p>
        <MdOutlineViewHeadline />
      </p>
     
       
            <span>  View User</span>
      
    </Link>
  );
};
