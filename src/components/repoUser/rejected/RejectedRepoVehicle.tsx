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
import { RepossessionStatus } from "@/utils/staticData";

const AllRequestedVehicles = (props) => {
  const{user}=props
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  //   const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(5);
  const [searchLoading,setSearchLoading]=useState(false)
  const [registrationNum, setRegistrationNum] = useState(null);
  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        status:'REPOSSESSION_REJECTED',
      });

      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (registrationNum) {
        params.append("searchByRegNo", registrationNum);
      }
      // if (vehicleStatus) {
      //   params.append("status", vehicleStatus);
      // }

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

  }, [Category, page, vehicleStatus,registrationNum]);
  useEffect(() => {
 
    FetchAllVehicleCategory(); // Call fetchData directly inside useEffect
  }, []);
  const UsersData = filteredData?.repoVehicleRequests
  || [];

  const userColumn = useMemo(
    () => [
      {
        header: "City",
        accessorKey: "initial_city",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "State",
        accessorKey: "initial_state",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Status",
        accessorKey: "status",
        cell: ({ row }) => {
          const role = row.original.status;
          return <span>{RepossessionStatus[role] || role}</span>;
        },
      },
      // {
      //   header: "Yard  ",
      //   accessorKey: "yard.org_name",
      //   // id: "clsup_org_name", // Ensure unique id
      // },
      {
        header: "Registration no ",
        accessorKey: "repo_vehicle.reg_number",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "code",
        accessorKey: "repo_vehicle.code",
        // id: "code", // Ensure unique id
      },
      {
        header: "Vehicle category",
        accessorKey: "repo_vehicle.vehicle_category.name",
      },{
        header: "Make",
        accessorKey: "repo_vehicle.make",
      },
      {
        header: "View",
        cell: ({ row }) =><View row={row} user={user} />
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

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Rejected Repo Vehicles
      </h1>
     <div className="flex items-end px-8 gap-40">
      <div className="flex flex-col w-40  ">
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
          <Search placeholder='eg: KL14WW1111'label='Search Registration Number' searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
        </div>
     
       
        </div>
      <div>
      {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Rejected Vehicles" catFilter={catFilter}  />
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
      ? `/requestedRepo/${row.original.id}`
      : `/rejectedRepoVehicle/${row.original.id}`;

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
