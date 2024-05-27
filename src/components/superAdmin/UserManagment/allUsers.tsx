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
import { FaUserSlash ,FaUser,FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash,FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";


const UserManagement = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

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
        `/user/users?page=${page}&limit=10&status=1&role=${roleFilter}`
      );
      console.log("all users", response);
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

  // console.log("role filter", roleFilter);

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.data?.users || [];

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
        cell: ({ row }) => View(row),
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
  header: "Status",
  cell: ({ row }) => {
    const isBlocked = row?.original?.is_blocked;

    return (
      <div className={`border-2 p-1 ${isBlocked ? 'bg-red-500' : 'bg-green-600'} space-x-2 font-semibold rounded-md uppercase text-center flex justify-center items-center`}>
        <p className="text-lg">
          {isBlocked ? <FaUserLargeSlash /> : <FaUserLarge />}
        </p>
        <button
          className="text-white font-semibold uppercase"
          onClick={() => handleUserBlockToggle(row.original, !isBlocked)}
        >
          {isBlocked ? 'block' : 'unblock'}
        </button>
      </div>
    );
  }
}

      
    ], 
    [filteredData]
  );

  const handleUserBlockToggle = async (user, block) => {
    // console.log("user from handleUserBlockToggle", user);
    const action = block ? 'block' : 'unblock';
    const confirmation = window.confirm(`Are you sure you want to ${action} this user?`);
  
    if (!confirmation) {
      return;
    }
  
    try {
      const response = await axiosInstance.patch(`/user/${user.id}/restrict/any`, {
        blockProperty: block,
      });
      console.log('response from block',response);
      fetchData()
      
      console.log('response from user block/unblock', response);
    } catch (error) {
      console.log("error from user block/unblock", error);
    }
  };


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        User Management
      </h1>
      <div className="flex w-full px-8 justify-between">
        <div className="">
          <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} />
        </div>
        <div className="self-end">
          <Link
          href={`/userManagement/createUser`}
            // onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add User
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
       {   filteredData && <DataTable data={UsersData} columns={userColumn} />
        /* )} */}
      </div>
    </div>
  );
};

export default UserManagement;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p><MdOutlineViewHeadline/></p>
      <Link href={`/userManagement/${row.original.id}`} target="_blank" rel="noopener noreferrer" className="">
        View
      </Link>
    </div>
  );
};


