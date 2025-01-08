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
import { log } from "util";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";

const AllInitiatedVehicles = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [vehicleInitiated, setVehicleInitiated] = useState([]);
  const [allClientLevelOrg, setAllClientLevelOrg] = useState();
  const [limit, setLimit] = useState(5);
  const [catFilter, setCatFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      //   console.log("cat", response);

      setAllVehicleCategory(response?.data?.vehicleCategory);
      //   console.log("response of fetchAllVehicle Category", response);

      // toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      // toast.error("Failed to fetch vehicle categories");
      // console.log("response of fetchAllVehicle Category",FetchAllVehicleCategory);
      console.log("response of fetchAllVehicle Category error", error);
    }
  }, []);

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setAllClientLevelOrg(response?.data?.res?.clientLevelOrg);

      //   console.log("reponse of clientlevelorg ", response);
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  console.log("allClientLevelOrg", allClientLevelOrg);

  const FetchAllVehicleOwnerships = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        status: "INITIATED",
      });
      //   params?.
      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (selectedYard) {
        params.append("cl_org_id", selectedYard);
      }

      const response = await axiosInstance.get(`release?${params.toString()}`);
      console.log("resopnse of  INITIATED VEHCIES", response);
      setFilteredData(response?.data?.res?.totalCount);
      setVehicleInitiated(response?.data?.res?.vehicleReleaseData);
    } catch (error) {
      console.log("error", error);
    } finally {
    }
  }, [page, Category, selectedYard, vehicleStatus]);

  const allYardsOptions = allyard?.map((item) => ({
     value: item.id,
    label: item.org_name,
  }));

  // console.log("allYardsOptions",allYardsOptions);

  const vehicleCategorysOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus]);

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, []);

  console.log("vehicleInitiated", vehicleInitiated);

  const UsersData = vehicleInitiated || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Client Organisation ",
        accessorKey: "vehicle_ownership.cl_org.org_name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Vehicle Category  ",
        accessorKey: "vehicle_ownership.vehicle.vehicle_category.name",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "Make ",
        accessorKey: "vehicle_ownership.vehicle.make",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Model  ",
        accessorKey: "vehicle_ownership.vehicle.model",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Code  ",
        accessorKey: "vehicle_ownership.vehicle.code",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Status  ",
        accessorKey: "status",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "Yard Name  ",
        accessorKey: "vehicle_ownership.vehicle.yard.org_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Action",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleCategorySelect = (e) => {
    const value = e.target.value;
    setVehiclecat(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  

  const handleOwnershipStatus = (e) => {
    const value = e.target.value;
    setVehicleStatus(value);
  };
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto md:text-lg font-bold py-2 uppercase">
        All Release Initiated Vehicles
      </h1>

      <div className="lg:grid-cols-3 grid-cols-1 w-full  gap-4     place-items-center">
        <div className="flex flex-col mr-14">
          <label htmlFor="state" className={labelStyle?.data}>
            Select Category
          </label>
          <select
            id="state"
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

export default AllInitiatedVehicles;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md  px-2">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/releasevehicle/initiatedVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
