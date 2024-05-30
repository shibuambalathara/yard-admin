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
import CreateClientLevelOrg from "@/components/superAdmin/organisationManagement/clientLevelOrg/addClientLevelOrgs";
import Pagination from "@/components/pagination/pagination";

const AllClientLevelOrganisation = () => {
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
        `/clientorg/client_lvl_org?page=1&limit=5&status=1&client_org_level=CLIENT_ORG`
      );
      // console.log("all users", response);
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
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.clientLevelOrg || [];

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
        header: "Code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },
      {
        header: "Country",
        accessorKey: "country",
        // id: "country", // Ensure unique id
      },
      {
        header: "ID",
        accessorKey: "id",
        // id: "id", // Ensure unique id
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

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        User Management
      </h1>
      <div className="flex w-full px-8 justify-between">
        <div className="">
          <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} />
        </div>
        <div className="self-end">
          <button
            // href={`/userManagement/createUser`}
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add User
          </button>
          {modalOpen && (
            <CreateClientLevelOrg
              onClose={handleModalClose}
              fetchData={fetchData}
            />
          )}
        </div>
      </div>
      <div>
        {/* {isLoading ? (
          <div className="flex w-full h-screen items-center justify-center">
            <Loading />
          </div>
        ) : ( */}
        {
          filteredData && <DataTable data={UsersData} columns={userColumn} />

          /* )} */
        }
        <div className="w-full text-center">
          {filteredData?.totalCount && (
            <Pagination
              page={page}
              setPage={setPage}
              totalDataCount={filteredData?.totalCount}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AllClientLevelOrganisation;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/organisationManagement/clientLevelSuperOrg/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
