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
import AddParkFee from "@/components/yardManager/parkFee/addParkFee";
import Pagination from "@/components/pagination/pagination";
import EditParkFeeIndividual from "./editParkFee";

const MangeParkFee = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const fetchParkFeeData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/parkfee/?page=1&limit=5&status=1&client_org_level=CLIENT_ORG`
      );
      console.log("all users", response);
      setFilteredData(response?.data?.res);
    } catch (error) {
     
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  console.log("filteredData from mangeparkfee", filteredData);

  useEffect(() => {
    fetchParkFeeData(); // Call fetchData directly inside useEffect
  }, [roleFilter, page]);

  const UsersData = filteredData?.parkFee || [];

  const userColumn = useMemo(
    () => [

      {
        header: "Client Organisation ",
        accessorKey: "cl_org.cl_org_name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Vehicle Category  ",
        accessorKey: "vehicle_category.name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Yard  ",
        accessorKey: "yard.yard_name",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "Park fee per day ",
        accessorKey: "park_fee_per_day",
        // id: "code", // Ensure unique id
      },
      
      
      {
        
        header: "Action",
        cell: ({ row }) => (
          <button onClick={() => handleEditClick(row.original.id)} className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
            <p>
              <MdOutlineViewHeadline />
            </p>
            <p
              rel="noopener noreferrer"
              className=""
              
            >
              View
            </p>
          </button>
        ),
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
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
      Park Fee
      </h1>
      <div className="flex w-full px-8 justify-between">
        
        <div className="flex justify-end w-full border">
          <button
            // href={`/userManagement/createUser`}
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >  
            Add 
          </button>
          {/* {modalOpen && (
            <AddParkFee
              onClose={handleModalClose}
              fetchData={fetchParkFeeData}
            />
          )} */}
 <div className="w-full relative">
              {modalOpen && 
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <AddParkFee
              onClose={handleModalClose}
              fetchData={fetchParkFeeData}
            />
            </div>
              }
          </div>

        </div>
      </div>
      {editModalOpen && (
        <div className="relative border ">
        <div className="  absolute top-40 right-0  w-full h-full flex items-center justify-end   z-50  border-green-500 ">
        <div className=" w-full   max-w-sm z-20 ">
        <EditParkFeeIndividual userId={selectedUserId} onClose={handleEditModalClose}/>
          </div></div></div>
      
    )}
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
        {/* <div className="w-full text-center">
          {filteredData?.totalCount && (
            <Pagination
              page={page}
              setPage={setPage}
              totalDataCount={filteredData?.totalCount}
            />
          )}
        </div> */}
      </div>
      
    </div>
  );
};

export default MangeParkFee;

