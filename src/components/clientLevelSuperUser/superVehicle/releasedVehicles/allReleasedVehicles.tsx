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
import NoVehicleMessage from "@/components/commonComponents/noVehicle/noVehicle";

const AllReleasedVehicles = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [vehicleRelease, setvehicleRelease] = useState([]);
  const [allClientLevelOrg, setAllClientLevelOrg] = useState();
  const [client, setClient] = useState("");
  const [children, setChildren] = useState([]);
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const fetchChildren = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_super_org/child/_org`
      );
      setChildren(response?.data?.res?.clientLvlOrg);
    } catch (error) {
      // toast.error("Failed to fetch children");
    }
  }, []);
  useEffect(() => {
    fetchChildren();
  }, []);
  const superClientOptions = children.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));
  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
   

      setAllVehicleCategory(response?.data?.vehicleCategory);
     

      
    } catch (error) {
      console.log("error",error);
      
      // toast.error("Failed to fetch vehicle categories");
      
    }
  }, []);

  const FetchAllYards = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);

      //   console.log("all yards", response?.data?.res?.yard);
      setAllYard(response?.data?.res?.yard);
      // toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      console.log("error",error);
      
      // toast.error("Failed to fetch yards");
    }
  }, []);

  console.log("allClientLevelOrg", allClientLevelOrg);

  const FetchAllVehicleOwnerships = useCallback(async () => {
    if (!client) {
      return;
    }
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "10",
        status: "RELEASED",
        cl_org_id: client,
      });
      //   params?.
      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (selectedYard) {
        params.append("yard_id", selectedYard);
      }

      const response = await axiosInstance.get(
        `release/client?${params.toString()}`
      );
      console.log("resopnse of allreleasedVEhicles", response);

      setvehicleRelease(response?.data?.res?.vehicleReleaseData);
      setFilteredData(response?.data?.res?.totalCount);
    } catch (error) {
      console.log("error",error);
      
    } finally {
    }
  }, [page, Category, selectedYard, vehicleStatus, client]);

  const allYardsOptions = allyard?.map((item) => ({
    value: item?.id,
    label: item?.yard_name,
  }));

  // console.log("allYardsOptions",allYardsOptions);

  const vehicleCategorysOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus, client]);

  useEffect(() => {
    FetchAllVehicleCategory();

    FetchAllYards();
  }, []);

  const UsersData = vehicleRelease || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Client Organisation ",
        accessorKey: "vehicle_ownership.cl_org.cl_org_name",
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
        accessorKey: "vehicle_ownership.vehicle.yard.yard_name",
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
    setCategoryFilter(selectedOption.text);
  };
  const handleYardSelection = (e) => {
    const value = e.target.value;
    setSelectedYard(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setYardFilter(selectedOption.text);
  };
  const handleOwnershipStatus = (e) => {
    const value = e.target.value;
    setVehicleStatus(value);
  };
  const handleOrgChange = (e) => {
    setClient(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setRoleFilter(selectedOption.text);
  };
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase mt-4">
        All Released Vehicles
      </h1>

      <div className=" grid grid-cols-2 w-full  gap-4     place-items-start px-5">
        <div>
          <label htmlFor="client" className={labelStyle.data}>
            Select Client
          </label>
          <select
            id="client"
            className={inputStyle.data}
            onChange={handleOrgChange}
          >
            <option value="">Select Client  </option>
            {superClientOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>{" "}
        </div>
        <div className="flex flex-col  ">
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
            {/* <option value="">ALL STATE</option> */}

            {vehicleCategorysOptions.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>
        <div className="flex flex-col   ">
          <label htmlFor="state" className={labelStyle?.data}>
            Select Yard
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleYardSelection}
          >
            <option value="">All Yard</option>
            {/* <option value="">ALL STATE</option> */}

            {allYardsOptions.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>
        <div className="flex flex-col  ">
          <label htmlFor="state" className={labelStyle?.data}>
            Status
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleOwnershipStatus}
          >
            <option value="">Select Status</option>
            {/* <option value="">ALL STATE</option> */}

            {ReleaseStatus.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>
      </div>
      <div>
        {/* {isLoading ? (
          <div className="flex w-full h-screen items-center justify-center">
            <Loading />
          </div>
        ) : ( */}
        {
          filteredData > 0 ? (
            vehicleRelease && (
              <DataTable data={UsersData} columns={userColumn} />
            )
          ) : (
            <NoVehicleMessage
            typeFilter="vehicles"
            roleFilter={roleFilter}
            statusFilter={statusFilter}
            categoryFilter={categoryFilter}
            yardFilter={yardFilter}

          />
          )

          /* )} */
        }
        {/* <div className="w-full text-center">
          {filteredData?.totalCount && (
            <Pagination
              page={page}
              setPage={setPage}
              totalDataCount={filteredData?.totalCount}
            />
          )}
        </div> */}
      </div>
    </div>
  );
};

export default AllReleasedVehicles;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehiclesSuperOrg/releasedVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
