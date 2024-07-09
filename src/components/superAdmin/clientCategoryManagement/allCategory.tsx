"use client";
import React, { useState, useEffect, useMemo } from "react";
import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { Role, AccountStatus } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
import Link from "next/link";
import DataTableid from "@/components/idAcess/idAccess";
import Pagination from "@/components/pagination/pagination";
import Addcategory from "@/components/superAdmin/clientCategoryManagement/AddClientCategory";
import Loading from "@/app/(home)/(superAdmin)/loading";
import EditClientCategory from "@/components/superAdmin/clientCategoryManagement/ViewClientCategory";
import { MdOutlineViewHeadline } from "react-icons/md";

import SmallGrid from "@/components/tables/SmallTable";
const ClientCategoryManagement = () => {
  const [clientData, setClientData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchData = async () => {
    console.log("CAT CALLED");
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`/clientorg/cat/`);

      console.log("responce", response);

      setClientData(response.data?.clientCategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const ClientColumn = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Description",
        accessorKey: "description",
      },

      {
        id: "view",
        header: "View ",
        cell: ({ row }) => (
          <div className="flex justify-center ">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
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

  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex w-full h-screen items-center justify-center">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <>
      <div className="w-full">
        <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
          Manage Client Category
        </h1>
        <div className="flex w-full px-8 justify-between">
          <div className="">
            {/* <RoleSelect roleOptions={Role} setRoleFilter={setRoleFilter} /> */}
          </div>
          <div className="w-full flex flex-col space-y-4">
            <div className="self-end">
              <button
                onClick={handleModalOpen}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                Add
              </button>
            </div>
            <div className="w-full relative">
              {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                  <Addcategory
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
            <div className="relative border ">
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <EditClientCategory
                  clientId={selectedUserId}
                  onClose={handleEditModalClose}
                  fetchData={fetchData}
                />
              </div>
            </div>
          )}
          <div>
            {clientData && (
              <SmallGrid data={clientData} columns={ClientColumn} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ClientCategoryManagement;

// const View = (row) => {
//   // console.log("view", row);
//   return (
//     <div>
//       <Link href={`/clientCategoryManagement/${row.original.id}`} target="_blank" rel="noopener noreferrer">View</Link>
//     </div>
//   );
// };

const View = ({ row, onEditClick }) => {
  // console.log("row form category", row);

  return (
    <div
      onClick={() => onEditClick(row?.original?.id)}
      className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white"
    >
      <p>
        <MdOutlineViewHeadline />
      </p>

      <span> View</span>
    </div>
  );
};
