"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role, ReleaseStatus } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import CreateUserModal from "@/components/superAdmin/UserManagment/createUser";
import { RoleSelect } from "@/components/commonComponents/role";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { FaUserSlash, FaUser, FaRegEye } from "react-icons/fa";
import { FaUserLargeSlash, FaUserLarge } from "react-icons/fa6";
import { GrFormView } from "react-icons/gr";
import { MdOutlineViewHeadline } from "react-icons/md";
import AddParkFee from "@/components/yardManager/parkFee/addParkFee";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";

const AllReleaseInitiatedVehicles = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [vehicleInitiated, setVehicleInitiated] = useState([]);
  const [limit, setLimit] = useState(5);
  const [catFilter, setCatFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log("response of fetchAllVehicle Category error", error);
    }
  }, []);

  const FetchAllYards = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);
      setAllYard(response?.data?.res?.yard);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const FetchAllVehicleOwnerships = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status: "INITIATED",
      });
      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (selectedYard) {
        params.append("yard_id", selectedYard);
      }
      const response = await axiosInstance.get(`release/client?${params.toString()}`);
      setVehicleInitiated(response?.data?.res?.vehicleReleaseData);
      setFilteredData(response?.data?.res?.totalCount);
    } catch (error) {
      console.log("error", error);
    }
  }, [page, limit, Category, selectedYard]);

  const allYardsOptions = allyard?.map((item) => ({
    value: item?.id,
    label: item?.yard_name,
  }));

  const vehicleCategorysOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus]);

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchAllYards();
  }, []);

  const UsersData = vehicleInitiated || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Client Organisation",
        accessorKey: "vehicle_ownership.cl_org.cl_org_name",
      },
      {
        header: "Vehicle Category",
        accessorKey: "vehicle_ownership.vehicle.vehicle_category.name",
      },
      {
        header: "Make",
        accessorKey: "vehicle_ownership.vehicle.make",
      },
      {
        header: "Model",
        accessorKey: "vehicle_ownership.vehicle.model",
      },
      {
        header: "Code",
        accessorKey: "vehicle_ownership.vehicle.code",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Yard Name",
        accessorKey: "vehicle_ownership.vehicle.yard.yard_name",
      },
      {
        header: "Action",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  const handleCategorySelect = (e) => {
    const value = e.target.value;
    setVehiclecat(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  const handleYardSelection = (e) => {
    const value = e.target.value;
    setSelectedYard(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
        All Initiated Vehicles
      </h1>

      <div className="grid grid-cols-3 w-full gap-4 place-items-center">
        <div className="flex flex-col">
          <label htmlFor="category" className={labelStyle?.data}>
            Select Category
          </label>
          <select
            id="category"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleCategorySelect}
          >
            <option value="">All Category</option>
            {vehicleCategorysOptions.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="yard" className={labelStyle?.data}>
            Select Yard
          </label>
          <select
            id="yard"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleYardSelection}
          >
            <option value="">All Yard</option>
            {allYardsOptions.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
       
      </div>

      <div>
        {filteredData < 1 ? (
          <NoVehicleMessage typeFilter="Initiated Vehicles" catFilter={catFilter}  yardFilter={yardFilter}/>
        ) : (
          <div className="w-full">
            {vehicleInitiated && (
              <DataTable data={UsersData} columns={userColumn} />
            )}
            <div className="w-full text-center">
              {filteredData > 0 && (
                <Pagination
                  page={page}
                  setPage={setPage}
                  limit={limit}
                  totalDataCount={filteredData}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllReleaseInitiatedVehicles;

const View = (row) => {
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehicles/initiatedVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </Link>
    </div>
  );
};
