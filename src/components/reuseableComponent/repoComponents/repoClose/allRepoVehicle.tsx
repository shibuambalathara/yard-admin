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
import { ClientFilter, Search } from "../../filter/filters";

const  AllRequestedVehicles = (props) => {
  const { user ,childrenRequire} = props;
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
  const [searchLoading,setSearchLoading]=useState(false)
  const [registrationNum, setRegistrationNum] = useState(null); // State for selected vehicle ID
  const [children, setChildren] = useState([]);
  const [client, setClient] = useState("");
console.log(selectedVehicleId);


const fetchChildren = useCallback(async () => {
  if (user === "super") {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_super_org/child/_org`);
      setChildren(response?.data?.res?.clientLvlOrg);
      console.log(response);
    } catch (error) {
      console.log("Error fetching children:", error);
    }
  }
}, [user]);
  const fetchVehicles = async () => {
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        page: page?.toString(),
        limit: limit?.toString(),
        // status: 'REPOSSESSION_COMPLETED',
      });
      if (childrenRequire && client) {
        params.append("cl_org_id", client);
      }
      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (registrationNum) {
        params.append("searchByRegNo", registrationNum);
      }

      const response = await axiosInstance.get(
        `repossession/captured?${params.toString()}`
      );
      console.log("RESPONSE OF API CALL", response?.data?.res);

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
  const superClientOptions = children.map((item) => ({
    value: item.id,
    label: item.org_name,
  }));

  useEffect(() => {
    fetchVehicles();
    
  }, [Category, page, vehicleStatus,registrationNum,client]);
  useEffect(() => {
    fetchChildren()
    FetchAllVehicleCategory(); // Call fetchData directly inside useEffect
  }, []);


  const UsersData = filteredData?.repoVehicleCapturedRequests|| [];

  const userColumn = useMemo(
    () => [
      {
        header: "captured City",
        accessorKey: "captured_city",
      },
      
      {
        header: "captured State",
        accessorKey: "captured_state",
      },
      { header: "Category", accessorKey: "repo_vehicle.vehicle_category.name" },
      { header: "Model", accessorKey: "repo_vehicle.model" },
      { header: "make", accessorKey: "repo_vehicle.make" },
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
      // {
      //   header: "Close",
      //   cell: ({ row }) => <Cancel row={row} user={user} setModalOpen={setModalOpen} setSelectedVehicleId={setSelectedVehicleId} setStatus={setStatus}/>,
      // },
      {
        header: "Action",
        cell: ({ row }) => (
          row.original?.repo_vehicle?.status==="CLOSED"? (
            <div className="flex justify-end w-fit h-fit ">
              <button className="bg-gray-500 text-white py-1 px-2 rounded cursor-not-allowed mb-1 mr-2 w-20">
               Closed
              </button>
            </div>
          ) : (
            <Cancel row={row} user={user} setModalOpen={setModalOpen} setSelectedVehicleId={setSelectedVehicleId} setStatus={setStatus}/>
          )
        ),
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
        Captured Repo Vehicles
      </h1>
      <div className="flex items-end px-8 gap-36">
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
        
{childrenRequire&&(<div>
          <ClientFilter    setClient={setClient} options={superClientOptions} />
        </div>)}
        
        <div>
          <Search placeholder='eg: KL14WW1111'label='Search Registration Number' searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
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
      ? `/capturedVehicles/${row.original.id}`
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
