"use client";
import { useMemo } from "react";
import { useState, useEffect } from "react";
import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Addcategory from "@/components/superAdmin/vehicleCategoryManagement/addCategory";
import Spinner from "@/components/commonComponents/spinner/spinner";
import { MdOutlineViewHeadline } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import EditVehicleCategory from "@/components/superAdmin/vehicleCategoryManagement/editCategory";

const VehicleCategoryManagement = () => {
  const [category, setCategory] = useState();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
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

  useEffect(() => {
    console.log("page mount");

    return () => {
      console.log("page unmounted");
    };
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log("error from vehiclecat", error);
      // toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categoryColumn = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "description ",
        accessorKey: "description",
      },

      {
        id: "view",
        header: "View ",
        cell: ({ row }) => (
          <div className="flex justify-center relative z-10">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
      },
    ],
    []
  );

  // if (isLoading) {
  //   return (
  //     <div className="flex w-full h-screen items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

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
    {/* <div className="w-full p-2">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        Manage Vehicle Category
      </h1>
      <div className="text-end mx-4 w-full  flex justify-end pr-6 rounded-md">
        <div className="bg-blue-500 hover:bg-blue-600 transition duration-200  flex items-center justify-center px-4 py-2 rounded-md ">
          <button
            onClick={handleModalOpen}
            className=" text-white  text-lg px-2 rounded"
          >
            Add
          </button>
        </div>
        {modalOpen && (
          <Addcategory onClose={handleModalClose} fetchData={fetchData} />
        )}
      </div>
      <div className="w-full relative">
        {editModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <EditVehicleCategory
              categoryId={selectedUserId}
              onClose={handleEditModalClose}
              fetchData={fetchData}
            />
          </div>
        )}
      </div>
      {category && <DataTable data={category} columns={categoryColumn} />}
    </div> */}


    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
      Manage Vehicle Category
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
              {modalOpen && 
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
             <Addcategory onClose={handleModalClose} fetchData={fetchData} />
            </div>
              }
          </div>
        </div>
      </div>
  <div className="">
  {editModalOpen && (
        <div className="relative border ">
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">

        <EditVehicleCategory
              categoryId={selectedUserId}
              onClose={handleEditModalClose}
              fetchData={fetchData}
            />
            
          </div>
        </div>
      )}
  <div>
  {category && <DataTable data={category} columns={categoryColumn} />}
      </div>
      
  </div>
    </div>
    </>
  );
};

export default VehicleCategoryManagement;

const View = ({ row, onEditClick }) => {
  console.log("row form category", row);

  return (
    <div
      onClick={() => onEditClick(row?.original?.id)}
      className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white"
    >
      {/* <div className="flex flex-col justify-center items-center bg-red-500"> */}
      <p>
        <MdOutlineViewHeadline />
      </p>
      {/* <button
       
        className=" "
      > */}

      <span> View</span>
      {/* </button> */}
      {/* </div> */}
    </div>
  );
};
