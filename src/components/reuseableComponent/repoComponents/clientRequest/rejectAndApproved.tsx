"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import { Search } from "../../filter/filters";
import { formatDate } from "../dateAndTime";

const AllResponse = ({ user, childrenRequire, response }) => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setVehicleCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [client, setClient] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);
  const [registrationNum, setRegistrationNum] = useState("");

  const fetchVehicles = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "5",
        status: response,
      });
      if (registrationNum) params.append("searchByRegNo", registrationNum);
      if (childrenRequire && client) params.append("cl_org_id", client);
      if (category) params.append("vehicle_category_id", category);

      const { data } = await axiosInstance.get(
        `repossession/repo_veh_req?${params.toString()}`
      );
      setFilteredData(data?.res);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [page, response, registrationNum, client, category]);

  const fetchVehicleCategory = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get(`/Vehicle/cat`);
      setVehicleCategory(data?.vehicleCategory);
    } catch (error) {
      console.error("Error fetching vehicle categories:", error);
    }
  }, []);

  const fetchChildren = useCallback(async () => {
    if (user === "super") {
      try {
        const { data } = await axiosInstance.get(
          `/clientorg/client_lvl_super_org/child/_org`
        );
        setClient(data?.res?.clientLvlOrg);
      } catch (error) {
        console.error("Error fetching children:", error);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  useEffect(() => {
    fetchVehicleCategory();
    fetchChildren();
  }, [fetchVehicleCategory, fetchChildren]);

  const userColumns = useMemo(
    () => [
      { header: "Requested Date", accessorKey: "req_date", cell: ({ row }) => formatDate(row.original.req_date) },
      { header: "City", accessorKey: "initial_city" },
      { header: "State", accessorKey: "initial_state" },
      { header: "Organisation", accessorKey: "repo_vehicle.cl_org.org_name" },
      { header: "Registration no", accessorKey: "repo_vehicle.reg_number" },
      { header: "Category", accessorKey: "repo_vehicle.vehicle_category.name" },
      { header: "Make", accessorKey: "repo_vehicle.make" },
      { header: "Model", accessorKey: "repo_vehicle.model" },
      
      { header: "Requested User", accessorKey: "req_by_user_org.user.name" },
      { header: "Code", accessorKey: "repo_vehicle.code" },
      { header: "View", cell: ({ row }) => <View row={row} user={user} response={response} /> },
    ],
    [response, user]
  );

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        { response==="REPOSSESSION_REJECTED"? "Rejected  Vehicles":'Approved Vehicles'}
      </h1>
      <div className="flex items-end px-8 gap-40">
        <Dropdown
          label="Select Category"
          options={vehicleCategory}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Search
          placeholder="eg: KL14WW1111"
          label="Search Registration Number"
          searchLoading={searchLoading}
          setSearchVehicle={setRegistrationNum}
          setSearchLoading={setSearchLoading}
        />
        {childrenRequire && (
          <Dropdown
            label="Select Client"
            options={client}
            value={client}
            onChange={(e) => setClient(e.target.value)}
          />
        )}
      </div>
      <div>
        {filteredData?.totalCount < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={category} />
        ) : (
          <div className="w-full">
            <DataTable data={filteredData?.repoVehicleRequests || []} columns={userColumns} />
            <div className="w-full text-center">
              {filteredData?.totalCount > 0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={5}
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

export default AllResponse;

const View = ({ row, user, response }) => {
  const getUrl = () => {
    const base = user === "client" ? "/client" : "/super";
    if (response === "REPOSSESSION_APPROVED") return `${base}ApprovedVehicles/${row.original.id}`;
    if (response === "REPOSSESSION_REJECTED") return `${base}RejectedVehicles/${row.original.id}`;
    
  };

  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md">
      <MdOutlineViewHeadline />
      <Link href={getUrl()} target="_blank" rel="noopener noreferrer">
        View
      </Link>
    </div>
  );
};

const Dropdown = ({ label, options, value, onChange }) => (
  <div className="flex flex-col w-40">
    <label htmlFor={label} className={labelStyle?.data}>
      {label}
    </label>
    <select id={label} className={inputStyle?.data} value={value} onChange={onChange}>
      <option value="">All {label}</option>
      {options.map((option, index) => (
        <option key={index} value={option.id || option.value}>
          {option.name || option.label}
        </option>
      ))}
    </select>
  </div>
);
