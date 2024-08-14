"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import { Search } from "@/components/reuseableComponent/filter/filters";
import { formatDate } from "@/components/reuseableComponent/repoComponents/dateAndTime";
import { RepossessionStatus } from "@/utils/staticData";

const AllApprovedVehicles = (props) => {
  const { user } = props;
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [category, setCategory] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(5);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [registrationNum, setRegistrationNum] = useState(null);

  const fetchVehicles = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        status: "REPOSSESSION_APPROVED",
      });

      if (category) params.append("vehicle_category_id", category);
      if (registrationNum) params.append("searchByRegNo", registrationNum);

      const response = await axiosInstance.get(
        `repossession/repo_veh_req?${params.toString()}`
      );

      setFilteredData(response?.data?.res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.error("Failed to fetch vehicle categories", error);
    }
  }, []);

  const vehicleCategoryOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    fetchVehicles();
  }, [category, page, vehicleStatus, registrationNum]);

  useEffect(() => {
    fetchAllVehicleCategory();
  }, [fetchAllVehicleCategory]);

  const usersData = filteredData?.repoVehicleRequests || [];

  const userColumns = useMemo(
    () => [
      {
        header: "City",
        accessorKey: "initial_city",
      },
      {
        header: "State",
        accessorKey: "initial_state",
      },



      // {
      //   header: "Status",
      //   accessorKey: "status",
      //   cell: ({ row }) => {
      //     const role = row.original.status;
      //     return <span>{RepossessionStatus[role] || role}</span>;
      //   },
      // },
      {
        header: "Requested Date",
        accessorKey: "req_date",
        cell: ({ row }) => formatDate(row.original.req_date),
      },
      {
        header: "Registration No",
        accessorKey: "repo_vehicle.reg_number",
      },
      {
        header: "Code",
        accessorKey: "repo_vehicle.code",
      },{
        header: " Category",
        accessorKey: "repo_vehicle.vehicle_category.name",
      },
      {
        header: "View",
        cell: ({ row }) => <View row={row} user={user} />,
      },
      {
        header: "Action",
        cell: ({ row }) => (
          row.original.is_captured ? (
            <div className="flex justify-end w-fit h-fit">
              <button className="bg-gray-500 text-white py-1 px-2 rounded cursor-not-allowed mb-1 mr-2">
                Captured
              </button>
            </div>
          ) : (
            <Completed row={row} user={user} setSelectedVehicleId={setSelectedVehicleId} />
          )
        ),
      },
    ],
    [filteredData]
  );

  const handleCatChange = (e) => {
    setCategory(e.target.value);
    setCatFilter(e.target.options[e.target.selectedIndex].text);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-1 uppercase">
        Approved Repo Vehicles
      </h1>
      <div className="flex items-end px-8 gap-40">
        <div className="flex flex-col w-40">
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
            {vehicleCategoryOptions.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Search placeholder="e.g., KL14WW1111" label="Search Registration Number" searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
        </div>
      </div>
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Approved Vehicles" catFilter={catFilter} />
        ) : (
          <div className="w-full">
            <DataTable data={usersData} columns={userColumns} />
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

export default AllApprovedVehicles;

const View = ({ row, user }) => {
  const href =
    user === "client"
      ? `/requestedRepo/${row.original.id}`
      : `/approvedRepoVehicle/${row.original.id}`;

  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md">
      <MdOutlineViewHeadline />
      <Link href={href} target="_blank" rel="noopener noreferrer">
        View
      </Link>
    </div>
  );
};

const Completed = ({ row, user, setSelectedVehicleId }) => {
  return (
    <div className="flex justify-end w-fit h-fit">
      <Link
        href={`/approvedRepoVehicle/${row.original.id}/completed`}
        className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition duration-200 mb-1 mr-2"
      >
        Complete
      </Link>
    </div>
  );
};
