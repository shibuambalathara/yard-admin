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
import CreateClientLevelSubOrg from "@/components/superAdmin/organisationManagement/clientLevelSubOrg/addClientLevelSubOrg";
import Pagination from "@/components/pagination/pagination";

const AllClientLevelSubOrganisation = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [limit,setLimit]=useState(5)


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
            limit: limit.toString(),
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
      // setSuccess({
      //   text: response?.data?.message,
      // });
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

  const UsersData = filteredData?.clientLevelSubOrgs
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
        header: "View ",
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
      <div className="space-y-4 mt-2">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
      client Level Sub Organisation
      </h1>
      <div className="flex w-full px-8 justify-between">
        <div className="">
          {/* <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} /> */}
        </div>
        <div className="self-end">
          <Link
            href={`/organisationManagement/clientLevelSubOrg/createSubOrg/`}
    
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
            ADD 
            </Link>
         
        </div>
      </div>
      </div>
      <div>
       
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
              limit={limit}
            />
          )}
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
