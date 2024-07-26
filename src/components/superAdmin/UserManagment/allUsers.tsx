"use client";
import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role,RoleAliass, UserStatus } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import CreateUserModal from "@/components/superAdmin/UserManagment/createUser";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser, FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash, FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import {
  RoleSelect,
  FilterComponent,
} from "@/components/commonComponents/role";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import NoUsersMessage from "@/components/commonComponents/noUser/noUsers";
import { inputStyle, labelStyle, optionStyle } from "@/components/ui/style";
// import ConfirmationModal from "@/components/modals/confirmOwnership/confirmOwnership";

const UserManagement = () => {
  const [roleFilter, setRoleFilter] = useState("");
  
  const [status, setStatus] = useState('1');
  const [statusFilter, setStatusFilter] = useState("");
  const [filteredData, setFilteredData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [blockUser, setBlockUser] = useState(null);
  const [isBlockAction, setIsBlockAction] = useState(true);
  const [roleSetFilter, setRoleSetFilter] = useState("");

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
    setIsLoading(true);try {
      const params = new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),

        });
        if (roleFilter) {
          params.append('role',roleFilter);
        }
        if(status){
          params.append('status',status);

        }

        const response = await axiosInstance.get(
          `/user/users?${params.toString()}`
        );
    
      
      // console.log("all users", response);
      setFilteredData(response.data?.res);
    
    } catch (error) {
      setError({
        text: error?.response?.data?.message,
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("role filter", roleFilter);

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page,status]);


  const handleStatus = (e) => {
    const value = e.target.value;
    setStatus(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setStatusFilter(selectedOption.text);
  };



  const handleRoleChange = (e) => {
    const value = e.target.value;
    setRoleFilter(value);
  };
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
          <div className="">{View(row)}</div>
        ),
      },
      //       {
      //         id: "isBlocked",
      //         header: "Status",
      //         cell: ({ row }) =>
      //           row?.original?.is_blocked ?  (
      //             <div className="border-2 p-1 bg-green-600 space-x-2 font-semibold rounded-md  uppercase text-center flex justify-center items-center">
      //  <p className="text-lg"><FaUserLarge/></p>
      //               <button className="text-white font-semibold uppercase" onClick={() => handleUserBlockToggle(row.original, false)}>unblock</button>
      //             </div>
      //           ) : (
      //             <div className="border-2 p-1 bg-red-500 space-x-2 font-semibold rounded-md  uppercase text-center flex justify-center items-center">
      //                <p className="text-xl"><FaUserLargeSlash/> </p>
      //               <button className="text-white font-semibold uppercase" onClick={() => handleUserBlockToggle(row.original, true)}>block</button>
      //             </div>
      //           )
      //       },
      {
        id: "isBlocked",
        header: "Action",
        cell: ({ row }) => {
          const isBlocked = row?.original?.is_blocked;

          return (
            <div
              className={`border-2 p-1 ${
                isBlocked ? "bg-red-500" : "bg-green-600"
              } space-x-2 font-semibold w-fit rounded-md uppercase text-center flex justify-center items-center px-2`}
            >
              <p className="text-lg">
                {isBlocked ? <FaUserLargeSlash /> : <FaUserLarge />}
              </p>
              <button
                className="text-white font-semibold capitalize "
                onClick={() => openConfirmationModal(row.original, isBlocked)}
              >
                {isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          );
        },
      },
    ],
    [filteredData]
  );

  const openConfirmationModal = (user, isBlocked) => {
    setBlockUser(user);
    setIsBlockAction(!isBlocked);
    setConfirmModalOpen(true);
  };

  const handleUserBlockToggle = async () => {
    const user = blockUser;
    const block = isBlockAction;

    setConfirmModalOpen(false);

    try {
      const response = await axiosInstance.patch(
        `/user/${user.id}/restrict/any`,
        {
          blockProperty: block,
        }
      );
      console.log("response from block", response);
      fetchData();
      console.log("response from user block/unblock", response);
    } catch (error) {
      console.log("error from user block/unblock", error);
    }
  };
  // const handleUserBlockToggle = async (user, block) => {
  //   // console.log("user from handleUserBlockToggle", user);
  //   const action = block ? "block" : "unblock";
  //   const confirmation = window.confirm(
  //     `Are you sure you want to ${action} this user?`
  //   );

  //   if (!confirmation) {
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.patch(
  //       `/user/${user.id}/restrict/any`,
  //       {
  //         blockProperty: block,
  //       }
  //     );
  //     console.log("response from block", response);
  //     fetchData();

  //     console.log("response from user block/unblock", response);
  //   } catch (error) {
  //     console.log("error from user block/unblock", error);
  //   }
  // };
  const handleInitiateClick = () => {
    setModalOpen(true);
  };

  const handleUserblock = async () => {
    setModalOpen(false);
    // await InitateVehcileRelease();
  };

  const handleCancelRelease = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        User Management
      </h1>
      <div className="flex w-full sm:px-5 px-2 justify-between items-center gap-2 ">
        
        <div className="flex flex-col   ">
          <label htmlFor="state" className={labelStyle?.data}>
            Role
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleRoleChange}
          >
            <option 
            className={optionStyle?.data} value="">All Roles</option>
           

            {Role.map((option, index) => (
              <option 
              className={optionStyle?.data} key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          
        </div>
        <div className="flex flex-col   ml-8">
        <label htmlFor="state" className={labelStyle?.data}>
            Status
          </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleStatus}
        >
         
          {/* <option value="">ALL STATE</option> */}

          {UserStatus.map((option, index) => (
            <option 
            className={optionStyle?.data} key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
        {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
      </div>
        <div  className="mt-5 ">
          <Link
            href={`/userManagement/createUser`}
            // onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 md:px-8 px-2  rounded hover:bg-blue-600 transition duration-200 " 
          >
            Add 
          </Link>
          {/* {modalOpen && <CreateUserModal onClose={handleModalClose} />} */}
        </div>
      </div>
      <div>
        {/* {isLoading ? (
          <div className="flex w-full h-screen items-center justify-center">
            <Loading />
          </div>
        ) : ( */}
        {filteredData?.totalCount<1 ? (
    <NoUsersMessage   roleFilter={roleFilter}   statusFilter={statusFilter} />
  ) : (
          <>
            <DataTable data={UsersData} columns={userColumn} />
            <div className="w-full text-center">
              {filteredData?.totalCount>0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData?.totalCount}
                />
              )}
            </div>
          </>
        )}

{confirmModalOpen && (
        <ConfirmationModal
          open={confirmModalOpen}
          onConfirm={handleUserBlockToggle}
          onCancel={() => setConfirmModalOpen(false)}
          message={`Are you sure you want to ${isBlockAction ? "block" : "unblock"} this user?`}
        />
      )}
      </div>
    </div>
  );
};

export default UserManagement;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className=" flex items-center  py-1 px-3 space-x-1 bg-gray-700 text-white  rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/userManagement/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};



const ConfirmationModal = ({ open, onConfirm, onCancel, message }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <p className="text-lg font-bold mb-4">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};


