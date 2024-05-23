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

const VehicleCategoryManagement = () => {
  const [category, setCategory] = useState();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner

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
      setSuccess({
        text: response?.data?.message,
      });
    } catch (error) {
      console.log("error from vehiclecat", error);
      toast.error(error?.response?.data?.message);
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
        header: "view ",
        accessorKey: "id",
        cell: ({ row }) => View(row),
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

  return (
    <div className="w-full p-2">
      <h1 className="text-center font-roboto text-lg font-bold py-4 uppercase">
        Manage Vehicle Category
      </h1>
      <div className="text-end mx-4">
        <button
          onClick={handleModalOpen}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Add Category
        </button>
        {modalOpen && <Addcategory onClose={handleModalClose} />}
      </div>
      <div>
        {category && <DataTable data={category} columns={categoryColumn} />}
      </div>
    </div>
  );
};

export default VehicleCategoryManagement;

const View = (row) => {
  return (
    <div>
      <Link
        href={`/vehicleCategoryManagement/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </Link>
    </div>
  );
};
