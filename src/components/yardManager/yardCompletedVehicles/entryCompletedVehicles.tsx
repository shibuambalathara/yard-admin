"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import { useForm } from "react-hook-form";

import {
  CategoryFilter,
  ClientFilter,
  Search,
  Status,
} from "@/components/reuseableComponent/filter/filters";
import { VehicleEntryStatus, YardEntryStatus } from "@/utils/staticData";
import { FetchVehicleCategory } from "@/utils/commonApi/commonApi";
import { InputField } from "@/components/ui/fromFields";

const AllEntryCompletedVehicles = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState(true);
  const [limit, setLimit] = useState(5);
  const [searchLoading, setSearchLoading] = useState(false);
  const [registrationNum, setRegistrationNum] = useState(null);

  const FetchAllVehicleCategory = async () => {
    try {
      const response = await FetchVehicleCategory();
      // console.log("vehciel category001", response);
      const vehiclecat = response.map((item) => ({
        label: item?.name,
        value: item?.id,
      }));
      setAllVehicleCategory(vehiclecat);
      // console.log("123456", vehiclecat);
    } catch (error) {
      console.log("vehciel category", error);
    }
  };

  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
      });

      console.log("category of vehcie", Category);

      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (registrationNum) {
        params.append("searchByRegNo", registrationNum);
      }
      // if (vehicleStatus) {
      params.append("status", vehicleStatus.toString()); // Convert boolean to string
      // }

      const response = await axiosInstance.get(
        `/repo_yard/vehicles/entry?${params.toString()}`
      );
      // console.log("res", response);

      setFilteredData(response?.data?.res?.vehicleEntryReq);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchVehicles();
    FetchAllVehicleCategory();
  }, [page, limit, Category, registrationNum, vehicleStatus]);

  // console.log("filtredData", filteredData);

  const yardData = filteredData || [];
  console.log("yardData", yardData);

  const yardColumn = useMemo(
    () => [
      {
        header: "code",
        accessorKey: "repo_vehicle.code",
      },
      {
        header: "make",
        accessorKey: "repo_vehicle.make",
      },
      {
        header: "model",
        accessorKey: "repo_vehicle.model",
      },

      {
        header: "Reg No",
        accessorKey: "repo_vehicle.reg_number",
      },
     
      {
        header: "Category ",
        accessorKey: "repo_vehicle.vehicle_category.name",
      },
      {
        header: "View",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto md:text-lg font-bold py-2 uppercase">
        Entry Completed Vehicles
      </h1>

      <div className=" grid lg:grid-cols-3 grid-cols-2  lg:gap-4 items-end lg:px-3 ">
        {/* <div>
          <ClientFilter />
        </div> */}

        <div>
          <CategoryFilter
            label="Select Category"
            options={vehicleCategory}
            setCategory={setCategory}
            Category={Category}
          />
        </div>

        <div>
          <Search
            placeholder="eg: KL14WW1111"
            label="Search by Registration No"
            searchLoading={searchLoading}
            setSearchVehicle={setRegistrationNum}
            setSearchLoading={setSearchLoading}
          />
        </div>
        {/* <div>
          <Status
            title="Select Status"
            options={YardEntryStatus}
            setVehicleStatus={setVehicleStatus}
            isTrue={true}
          />
        </div> */}
      </div>
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter} />
        ) : (
          <div className="w-full">
            <DataTable data={yardData} columns={yardColumn} />

            <div className="w-full text-center">
              {filteredData?.totalCount > 0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData?.totalCount}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllEntryCompletedVehicles;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 md:w-20 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/yardCompletedVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};

const dataFormat = (row) => {
  // console.log("row form dataFormat", row);

  let value = row?.original?.expected_entry_date?.split("T")[0];
  // console.log("date from dataformat", value);

  return <div>{value}</div>;
};
