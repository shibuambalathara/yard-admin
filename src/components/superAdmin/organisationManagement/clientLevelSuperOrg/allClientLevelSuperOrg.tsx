"use client";
import { useState, useEffect, useMemo } from "react";
import { CgOrganisation } from "react-icons/cg";
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
import CreateClientLevelSuperOrg from "@/components/superAdmin/organisationManagement/clientLevelSuperOrg/addClientLevelSuperOrg";
import Pagination from "@/components/pagination/pagination";
import  EditClientLevelSuperOrg from "@/components/superAdmin/organisationManagement/clientLevelSuperOrg/viewClientLevelSuperOrg"
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";

const AllClientLevelSuperOrganisation = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

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
      // console.log("all users", response);
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
        header: "Organisation Category",
        accessorKey: "clsup_org_category.name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Organisation Name",
        accessorKey: "clsup_org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },

     ,
      {
        id: "view",
        header: "View ",
        cell: ({ row }) => (
          <div className="w-20">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
      },
    ],
    [filteredData]
  );

  console.log("filetered data from clientLevelSuperOrg", filteredData);

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
    <>
    

      <div className="w-full">
        <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
          Client Level Super Organisation
        </h1>
        <div className="flex w-full px-8 justify-between">
          <div className="">
            
          </div>
          <div className="w-full flex flex-col space-y-4">
            <div className="self-end">
              <button
                onClick={handleModalOpen}
                className="bg-blue-500 text-white py-2 px-8 rounded hover:bg-blue-600 transition duration-200"
              >
                Add
              </button>
            </div>
            <div className="w-full relative">
              {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                  <CreateClientLevelSuperOrg
                    onClose={handleModalClose}
                    fetchData={fetchData}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="">
          {editModalOpen && (
       <div className="w-full relative">
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <EditClientLevelSuperOrg
                  clientSuperId={selectedUserId}
                  onClose={handleEditModalClose}
                  fetchData={fetchData}
                />
              </div>
             </div>
          )}
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
        </div>
      
    </>
  );
};

export default AllClientLevelSuperOrganisation;

// const View = (row) => {
//   return (
//     <div className="flex  justify-center items-center border w-fit space-x-1 bg-gray-800 text-white  py-1 px-3  rounded-md">
//       <p>
//         <MdOutlineViewHeadline />
//       </p>
//       <Link
//         href={`/organisationManagement/clientLevelSuperOrg/${row.original.id}`}
//         target="_blank"
//         rel="noopener noreferrer"
//         className=""
//       >
//         View
//       </Link>
//     </div>
//   );
// };


const View = ({ row, onEditClick }) => {
  // console.log("row form category", row);

  return (
    <div
      onClick={() => onEditClick(row?.original?.id)}
      className="flex justify-center items-center py-1 px-3   space-x-2 bg-gray-700 rounded-md  text-white"
    >
      <p>
        <MdOutlineViewHeadline />
      </p>

      <span> View</span>
    </div>
  );
};

