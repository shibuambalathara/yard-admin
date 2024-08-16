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
import { CgOrganisation } from "react-icons/cg";

const AllClientLevelOrganisation = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit,setLimit]=useState(5)
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
        `/clientorg/client_lvl_org?page=${page}&limit=${limit}&status=1&client_org_level=CLIENT_ORG`
      );
      // console.log("all users", response);
      setFilteredData(response?.data?.res);
     
    } catch (error) {
      setError({
        text: error?.response?.data?.message,
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  };

  console.log("filteredData from clientLevelsuperOrg", filteredData);

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.clientLevelOrg || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Organisation Name",
        accessorKey: "org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Super Organisation Name",
        accessorKey: "clsup_org.org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Organisation Category",
        accessorKey: "client_category.name",
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
        cell: ({ row }) =><div className="w-20">{ View(row)}</div>
      },
    ],
    [filteredData]
  );

  console.log("filetered data from clientLevelOrg",filteredData);

  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
      client Level Organisation
      </h1>
      <div className="flex w-full px-8 justify-end">
        {/* <div className="">
          <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} />
        </div> */}
        <div className="self-end">
          <Link
            href={`/organisationManagement/clientLevelOrg/createOrg`}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
            Add
          </Link>
          
        </div>
      </div>
      <div>
      {filteredData?.totalCount< 1?( <div className="flex flex-col justify-center items-center h-96 p-8">
      <div className="mb-6">
        <CgOrganisation className='text-red-500 font-bold text-6xl' />
      </div>
      <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
        
          <>

          <span>No Organization  Found</span>
         
          </>
        
      </p>
      
    </div>):( <>
      {filteredData && 

      <>
            <DataTable data={UsersData} columns={userColumn} />
            <div className="w-full text-center">
          {filteredData?.totalCount >0 && (
            <Pagination
              page={page}
              setPage={setPage}
              totalDataCount={filteredData?.totalCount}
              limit={limit}
            />
          )}
        </div>

      </>


      
      }
</>)}
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
        href={`/organisationManagement/clientLevelOrg/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
