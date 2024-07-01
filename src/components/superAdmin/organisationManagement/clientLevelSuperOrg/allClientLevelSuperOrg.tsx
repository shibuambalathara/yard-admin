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
import CreateClientLevelSuperOrg from "@/components/superAdmin/organisationManagement/clientLevelSuperOrg/addClientLevelSuperOrg"
import Pagination from "@/components/pagination/pagination";

const AllClientLevelSuperOrganisation = () => {
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
        `/clientorg/client_lvl_super_org?page=${page}&limit=${limit}&status=1&client_org_level=CLIENT_SUPER_ORG`
      );
      console.log("all users", response);
      setFilteredData(response?.data?.res);
  
    } catch (error) {
    
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

    //  console.log("filteredData from clientLevelsuperOrg",filteredData);
     
    //  clientLvlSuperOrg  clientLevelSuperOrgs
 
  // console.log("role filter", roleFilter);

  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.clientLvlSuperOrg || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Organization Category",
        accessorKey: "clsup_org_category.name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Organization Name",
        accessorKey: "clsup_org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },
      
      // {
      //   header: "ID",
      //   accessorKey: "id",
      //   // id: "id", // Ensure unique id
      // },
      {
        id: "viewUser",
        header: "View User",
        cell: ({ row }) => View(row),
      },
    ], 
    [filteredData]
  );
  

  console.log("filetered data from clientLevelSuperOrg",filteredData);
  


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
       Client Level Super Organisation
      </h1>
      <div className="flex w-full px-8 justify-end  ">
        
        <div className="self-end">
          <button
          // href={`/userManagement/createUser`}
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            ADD SUPER ORG
          </button>
          {modalOpen && <CreateClientLevelSuperOrg onClose={handleModalClose} fetchData={fetchData} />}
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

export default AllClientLevelSuperOrganisation;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
   
  //   <div className="border  bg-gray-700 text-white py-1 rounded-md ">
  //   {/* <p>
  //     <MdOutlineViewHeadline />
  //   </p>
  //   <Link href={`/organisationManagement/clientLevelSuperOrg/${row.original.id}`}
  //     target="_blank"
  //     rel="noopener noreferrer"
  //     className=""
  //   >
  //     View
  //   </Link> */}
  // </div>

<div className="flex  justify-center items-center border w-fit space-x-1 bg-gray-800 text-white  py-1 px-3  rounded-md">
<p>
       <MdOutlineViewHeadline />
   </p>
     <Link href={`/organisationManagement/clientLevelSuperOrg/${row.original.id}`}
       target="_blank"
      rel="noopener noreferrer"
     className=""
     >
       View
     </Link> 
</div>
  );
};

