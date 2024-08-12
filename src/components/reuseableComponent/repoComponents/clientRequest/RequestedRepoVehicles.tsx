"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import { Search } from "../../filter/filters";
import { formatDate } from "../dateAndTime";

const AllRequestedVehicles = (props) => {
  const { user, childrenRequire } = props;
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
  const [client, setClient] = useState("");
  const [children, setChildren] = useState([]);
  const [searchLoading,setSearchLoading]=useState(false)
  const [registrationNum, setRegistrationNum] = useState(null);
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
        status: "REPOSSESSION_REQUESTED",
      });
      if (registrationNum) {
        params.append("searchByRegNo", registrationNum);
      }
      if (childrenRequire && client) {
        params.append("cl_org_id", client);
      }
      if (Category) {
        params.append("vehicle_category_id", Category);
      }

      const response = await axiosInstance.get(
        `repossession/repo_veh_req?${params.toString()}`
      );
      console.log("res", response);

      setFilteredData(response?.data?.res);
    } catch (error) {
      setError({ text: error?.response?.data?.message });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      console.log("cat", response);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log("Error fetching vehicle categories:", error);
    }
  }, []);

  const vehicleCategories = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const superClientOptions = children.map((item) => ({
    value: item.id,
    label: item.org_name,
  }));

  const handleClient = (e) => {
    setClient(e.target.value);
  };

  const handleCatChange = (e) => {
    setCategory(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  const handleOwnershipStatus = (e) => {
    setVehicleStatus(e.target.value);
  };

  useEffect(() => {
    fetchVehicles();
    
  }, [Category, page, vehicleStatus,registrationNum,client]);
  useEffect(() => {
    fetchChildren()
    fetchAllVehicleCategory(); // Call fetchData directly inside useEffect
  }, []);

  const UsersData = filteredData?.repoVehicleRequests || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Requested Date",
        accessorKey: "req_date",
        cell: ({ row }) => formatDate(row.original.req_date),
      },
      { header: "City", accessorKey: "initial_city" },
      { header: "State", accessorKey: "initial_state" },
      { header: "Vehicle Category", accessorKey: "repo_vehicle.vehicle_category.name" },
      // { header: "Status", accessorKey: "status" },
      { header: "Organisation", accessorKey: "repo_vehicle.cl_org.org_name" },
      { header: "Model", accessorKey: "repo_vehicle.model" },
      { header: "Registration no", accessorKey: "repo_vehicle.reg_number" },
      { header: "Requested User", accessorKey: "req_by_user_org.user.name" },
      { header: "Code", accessorKey: "repo_vehicle.code" },
      

      {
        header: "View",
        cell: ({ row }) => <View row={row} user={user} />,
      },
    ],
    [filteredData, user]
  );

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        Requested Repo Vehicles
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
            {vehicleCategories.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
         <div>
          <Search placeholder='eg: KL14WW1111'label='Search Registration Number' searchLoading={searchLoading} setSearchVehicle={setRegistrationNum} setSearchLoading={setSearchLoading} />
        </div>
        {childrenRequire && (
          <div className="flex flex-col">
            <label htmlFor="client" className={labelStyle.data}>
              Select Client
            </label>
            <select id="client" className={inputStyle.data} onChange={handleClient}>
              <option value="">Select Client</option>
              {superClientOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
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
    user === "client"
      ? `/requestedRepo/${row.original.id}`
      : `/SuperRequestedRepo/${row.original.id}`;

  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link href={href} target="_blank" rel="noopener noreferrer">
        View
      </Link>
    </div>
  );
};
