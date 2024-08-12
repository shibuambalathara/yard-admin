"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";

import Link from "next/link";
import axiosInstance from "@/utils/axios";

import { MdOutlineViewHeadline } from "react-icons/md";

import Pagination from "@/components/pagination/pagination";

import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import RepoRespond from "@/components/reuseableComponent/repoComponents/modal/requestRespond";
import RequestForRepo from "./requestForRepo";
import RepoYardRequest from "@/components/reuseableComponent/repoComponents/modal/requestForYard";
import { Search } from "@/components/reuseableComponent/filter/filters";
const AllRequestedVehicles = (props) => {
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
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [allYard,  setAllYard] = useState([]); // State for selected vehicle ID
  const [registrationNum, setRegistrationNum] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        
      });
      if (registrationNum) {
        params.append("searchByRegNo", registrationNum);
      }

      if (Category) {
        params.append("vehicle_category_id", Category);
      }

      const response = await axiosInstance.get(
        `repo_yard/vehicles/eligible?${params.toString()}`
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
  const FetchAllyard = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);
      console.log("cat", response);

      setAllYard(response?.data?.res.yard);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));
  const yards= allYard?.map((item) => ({
    value: item?.id,
    label: item?.org_name,
  }));

  useEffect(() => {
    fetchVehicles();
   
  }, [Category, page, vehicleStatus,registrationNum]);
  useEffect(() => {
    FetchAllyard()
    FetchAllVehicleCategory();
  }, []);


  const UsersData = filteredData?.vehicles || [];

  const userColumn = useMemo(
    () => [
      {
        header: "make",
        accessorKey: "make",
      },
      {
        header: "model",
        accessorKey: "model",
      },
      {
        header: "Status",
        accessorKey: "status",
        
      },
      {
        header: "Organization",
        accessorKey: "cl_org.org_name",
      },
      {
        header: "Category ",
        accessorKey: "vehicle_category.name",
      },
      {
        header: "Registration no ",
        accessorKey: "reg_number",
      },
      {
        header: "Code",
        accessorKey: "code",
      },
      {
        header: "View",
        cell: ({ row }) => <View row={row} user={user} />,
      },
      {
        header: "Request",
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
        Closed Repo Vehicles
      </h1>
      <div className="flex items-end px-8 gap-40">
        <div className="flex flex-col w-40 ">
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
        <div>
          <Search
            placeholder="Search by Registration Number"
            searchLoading={searchLoading}
            setSearchVehicle={setRegistrationNum}
            setSearchLoading={setSearchLoading}
          />
        </div>
      </div>
      {modalOpen && (
        <div className="relative border">
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
            <RepoYardRequest yard={yards} status={status} onClose={handleModalClose} vehicleId={selectedVehicleId} fetchData={fetchVehicles} />
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
  const href =`/yardAvailableVehicle/${row.original.id}`;

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
    <div className="flex justify-center items-center border space-x-1 w-20 bg-green-600 text-white p-1 rounded-md">
    
      <button onClick={handleCancelClick} className="">
        Request
      </button>
    </div>
  );
};
