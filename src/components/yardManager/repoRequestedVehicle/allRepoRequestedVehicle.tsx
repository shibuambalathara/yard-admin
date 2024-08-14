// import React from 'react'

// const AllYardRequestedVehicle = () => {
//   return (
//     <div>allYardRequestedVehicle</div>
//   )
// }

// export default AllYardRequestedVehicle

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
import { FetchVehicleCategory } from "@/utils/commonApi/commonApi";
import { InputField } from "@/components/ui/fromFields";
import { VehicleEntryStatus,vehicleEntryAlias } from "@/utils/staticData";


const AllYardRequestedVehicle = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
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

      if (vehicleStatus) {
        params.append("status", vehicleStatus);
      }

      const response = await axiosInstance.get(
        `/repo_yard/requests?${params.toString()}`
      );
      console.log("res", response);

      setFilteredData(response?.data?.res);
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

  const yardData = filteredData?.repoYardRequest || [];

  const yardColumn = useMemo(
    () => [
      {
        header: "Expected Entry ",
        accessorKey: "expected_entry_date",
        cell: ({ row }) => dataFormat(row?.original?.expected_entry_date),
      },
      // {
      //   header: "make",
      //   accessorKey: "repo_vehicle.make",
      // },
      // {
      //   header: "model",
      //   accessorKey: "repo_vehicle.model",
      // },

      {
        header: "Reg No",
        accessorKey: "repo_vehicle.reg_number",
      },
      {
        header: "code",
        accessorKey: "repo_vehicle.code",
      },
      {
        header: "Category ",
        accessorKey: "repo_vehicle.vehicle_category.name",
      },
      {
        header: "Requested By ",
        accessorKey: "req_by_user_org.user.name",
      },
      {
        header: "Requested Date ",
        accessorKey: "req_date",
        cell: ({ row }) => dataFormat(row?.original?.req_date),
      },
      {
        header: "organisation ",
        accessorKey: "req_to_yard.org_name",
      },
      {
        header: "status ",
        accessorKey: "status",
        cell: ({ row }) => {
          const status = row.original.status;
          return <span>{vehicleEntryAlias[status] || status}</span>;
        },
      },
      // {
      //   header: "Action ",
      //   cell: ({ row }) => Completed(row),
      // },

      {
        header: "View",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  console.log("filtered DAta",filteredData);
  

  const statusFilter=VehicleEntryStatus.filter((item)=>item?.value !== "ENTRY_CANCELLED")
  console.log("statusFilter",statusFilter);
  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        All Repo Requests
      </h1>

      <div className=" grid grid-cols-3  gap-4 items-end px-3 ">
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
          label="Search by Registration No"
            placeholder="Eg: KL12GH4568"
            searchLoading={searchLoading}
            setSearchVehicle={setRegistrationNum}
            setSearchLoading={setSearchLoading}
          />
        </div>
        <div>
          <Status
            label="Select Status"
            options={statusFilter}
            setVehicleStatus={setVehicleStatus}
          />
        </div>
      </div>
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter} />
        ) : (
          <div className="w-full">
            <DataTable data={yardData} columns={yardColumn} />

            <div className="w-full text-center">
              {filteredData?.totalCount > limit && (
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

export default AllYardRequestedVehicle;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/repoRequestedVehicle/${row.original.id}`}
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
  let value = row?.split("T")[0];
  // console.log("date from dataformat", value);

  return <div>{value}</div>;
};
