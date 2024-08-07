"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";

import Link from "next/link";
import axiosInstance from "@/utils/axios";

import { MdOutlineViewHeadline } from "react-icons/md";

import Pagination from "@/components/pagination/pagination";

import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import { useRouter } from "next/navigation";
import { Search } from "@/components/reuseableComponent/filter/filters";
import { formatDate } from "@/components/reuseableComponent/repoComponents/dateAndTime";

const AllApprovedVehicles = (props) => {
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
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState('');
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [searchLoading,setSearchLoading]=useState(false)
  const [registrationNum, setRegistrationNum] = useState(null);
  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        status:'REPOSSESSION_APPROVED',
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
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Requested Date",
        accessorKey: "req_date",
        cell: ({ row }) => formatDate(row.original.req_date),
      },
      // {
      //   header: "Yard  ",
      //   accessorKey: "yard.yard_name",
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
        header: "View",
        cell: ({ row }) =><View row={row} user={user} />
      },
      {
        header: "Completed",
        cell: ({ row }) => <Completed row={row} user={user} setModalOpen={setModalOpen} setSelectedVehicleId={setSelectedVehicleId} setStatus={setStatus}/>,
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
        Approved Repo Vehicles
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
          <Search placeholder='Search by Registration Number' searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
        </div>

     
       
        </div>
      <div>
      {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter}  />
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

export default AllApprovedVehicles;

const View = ({ row, user }) => {
  const href =
    user === 'client'
      ? `/requestedRepo/${row.original.id}`
      : `/approvedRepoVehicle/${row.original.id}`;

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

const Completed = ({ row, user, setModalOpen, setSelectedVehicleId ,setStatus}) => {
 

  return (
    <div className="flex justify-end w-full h-fit">
    <Link
      href={`/approvedRepoVehicle/${row.original.id}/completed`}
      className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 mb-1 mr-6"
    >
      Completed
    </Link>
  </div>
  );
};



