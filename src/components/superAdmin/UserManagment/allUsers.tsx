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

      console.log("all users",response);
      
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

  console.log("role filter", roleFilter);

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.data?.users || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Email ",
        accessorKey: "email",
      },
      {
        header: "Role ",
        accessorKey: "role",
      },
      {
        header: "Code ",
        accessorKey: "code",
      },
      {
        id: "id",
        header: "View User",
        cell: ({ row }) => View(row),
      },
    ],
    []
  );

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="w-full  ">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        User Management
      </h1>
      <div className="flex w-full px-8 justify-between  ">
        {/* <div className=" w-36  flex flex-col text-center space-y-2  mx-4">
          <label
            htmlFor="bid-status "
            className="font-roboto font-semibold text-lg"
          >
            Select Role
          </label>
          <select
            id="bid-status"
            className="px-2 py-1 border-2"
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option disabled value="">
              select a client
            </option>

            {Role.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div> */}
        <div className="">
          <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} />
        </div>

        <div className="self-end">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add User
          </button>
          {modalOpen && <CreateUserModal onClose={handleModalClose} />}
        </div>
      </div>
      <div>
        {filteredData && <DataTable data={UsersData} columns={userColumn} />}
      </div>
    </div>
  );
};

export default UserManagement;

const View = (row) => {
  // console.log("view", row);
  return (
    <div>
      <Link href={`/userManagement/${row.original.id}`} target="_blank"
        rel="noopener noreferrer">View</Link>
    </div>
  );
};
