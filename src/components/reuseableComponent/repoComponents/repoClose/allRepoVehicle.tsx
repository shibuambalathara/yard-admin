"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";

import Link from "next/link";
import axiosInstance from "@/utils/axios";

import { MdOutlineViewHeadline } from "react-icons/md";

import Pagination from "@/components/pagination/pagination";

import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import RepoClose from "../modal/requestClose";

const  AllRequestedVehicles = (props) => {
  const { user } = props;
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(5);
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null); // State for selected vehicle ID
console.log(selectedVehicleId);

  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        status: 'REPOSSESSION_COMPLETED',
      });

      if (Category) {
        params.append("vehicle_category_id", Category);
      }

      const response = await axiosInstance.get(
        `repossession/repo_veh_req?${params.toString()}`
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
      console.log(error);
    }
  }, []);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    fetchVehicles();
    FetchAllVehicleCategory();
  }, [Category, page, vehicleStatus]);

  const UsersData = filteredData?.repoVehicleRequests || [];

  const userColumn = useMemo(
    () => [
      {
        header: "City",
        accessorKey: "initial_city",
      },
      {
        header: "State",
        accessorKey: "initial_state",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Registration no ",
        accessorKey: "repo_vehicle.reg_number",
      },
      {
        header: "Code",
        accessorKey: "repo_vehicle.code",
      },
      {
        header: "View",
        cell: ({ row }) => <View row={row} user={user} />,
      },
      {
        header: "Close",
        cell: ({ row }) => <Cancel row={row} user={user} setModalOpen={setModalOpen} setSelectedVehicleId={setSelectedVehicleId} setStatus={setStatus}/>,
      },
    ],
    [filteredData]
  );

  const handleCatChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  const handleOwnershipStatus = (e) => {
    const value = e.target.value;
    setVehicleStatus(value);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedVehicleId(null); // Reset selected vehicle ID
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Requested Repo Vehicles
      </h1>
      <div className="flex items-end">
        <div className="flex flex-col w-40 ml-5">
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
      </div>
      {modalOpen && (
        <div className="relative border">
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <RepoClose status={status} onClose={handleModalClose} vehicleId={selectedVehicleId} fetchData={fetchVehicles} user={user} />
          </div>
        </div>
      )}
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter} />
        ) : (
          <div className="w-full">
            <DataTable data={UsersData} columns={userColumn} />
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

export default AllRequestedVehicles;

const View = ({ row, user }) => {
  const href =
    user === 'client'
      ? `/repoClose/${row.original.id}`
      : `/superRepoClose/${row.original.id}`;

  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};

const Cancel = ({ row, user, setModalOpen, setSelectedVehicleId ,setStatus}) => {
  const handleCancelClick = () => {
    setStatus('REPOSSESSION_REQUESTED')
    setModalOpen(true);
    setSelectedVehicleId({repoId:row.original.id});
  };

  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-red-600 text-white p-1 rounded-md">
    
      <button onClick={handleCancelClick} className="">
        Close
      </button>
    </div>
  );
};
