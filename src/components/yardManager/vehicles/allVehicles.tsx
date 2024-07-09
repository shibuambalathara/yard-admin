"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";

import Link from "next/link";
import axiosInstance from "@/utils/axios";

import { MdOutlineViewHeadline } from "react-icons/md";

import Pagination from "@/components/pagination/pagination";

import { inputStyle, labelStyle } from "@/components/ui/style";

const AllVehicles = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  //   const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState(null);

  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(6);

  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit?.toString(),
      });

      if (Category) {
        params.append("vehicle_category_id", Category);
      }

      if (vehicleStatus) {
        params.append("status", vehicleStatus);
      }

      const response = await axiosInstance.get(
        `/vehicle/?${params.toString()}`
      );
      console.log("res", response);

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

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      console.log("cat", response);

      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      // toast.error("Failed to fetch vehicle categories");
      console.log(error);
    }
  }, []);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    fetchVehicles();
    FetchAllVehicleCategory(); // Call fetchData directly inside useEffect
  }, [Category, page, vehicleStatus]);

  const UsersData = filteredData?.vehicle || [];

  const userColumn = useMemo(
    () => [
      {
        header: "make",
        accessorKey: "make",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "model",
        accessorKey: "model",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Status",
        accessorKey: "status",
        // id: "clsup_org_name", // Ensure unique id
      },
      // {
      //   header: "Yard  ",
      //   accessorKey: "yard.yard_name",
      //   // id: "clsup_org_name", // Ensure unique id
      // },
      {
        header: "Category ",
        accessorKey: "vehicle_category.name",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },

      {
        header: "Action",
        cell: ({ row }) => View(row)
      },
    ],
    [filteredData]
  );

  const handleCatChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  const handleOwnershipStatus = (e) => {
    const value = e.target.value;
    setVehicleStatus(value);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Vehicles
      </h1>

      <div className="flex flex-col w-40  ml-8">
        <label htmlFor="state" className={labelStyle?.data}>
          Select Category
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleCatChange}
        >
          <option value="">All Category</option>

          {vehicleCategorys.map((option, index) => (
            <option key={index} value={option?.value}>
              {option?.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-full px-8 justify-between">
        <div className="flex justify-end w-full">
          <Link
            href={`/vehicle/addvehicle`}
            // onClick={handleModal}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200"
          >
            Add
          </Link>
        </div>
      </div>
      <div>
        {
          filteredData && <DataTable data={UsersData} columns={userColumn} />

          /* )} */
        }
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
      </div>
    </div>
  );
};

export default AllVehicles;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehicle/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
