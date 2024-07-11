"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role, VehicleState } from "@/utils/staticData";
import Link from "next/link";
import axiosInstance from "@/utils/axios";

import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";

import { MdOutlineViewHeadline } from "react-icons/md";
import AddParkFee from "@/components/yardManager/parkFee/addParkFee";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";  
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";


const AllInstockVehicles = () => {
 
  const [page, setPage] = useState(1);
  const [limit,setLimit]=useState(5)
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [allInstockVehicles, setAllInstockVehicles] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");
  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);

      console.log("response form vehicle cat of all instock",response);
      

      setAllVehicleCategory(response?.data?.vehicleCategory);

      // toast.success("Vehicle categories fetched successfully");
    } catch (error) {
      // toast.error("Failed to fetch vehicle categories");
      console.log("error",error);
      
    }
  }, []);

  const FetchAllYards = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);

      setAllYard(response?.data?.res?.yard);
     
    } catch (error) {
      console.log("error",error);
      
      // toast.error("Failed to fetch vehicle categories");
    }
  }, []);

  const FetchallInstockVehicles = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),

      });
    //   params?.
      if (Category) {
        params.append('vehicle_category_id',Category);
      }
      if (selectedYard) {
        params.append('yard_id',selectedYard);
      }
      

      const response = await axiosInstance.get(
        `release/owned_instock_vehicle?${params.toString()}`     
      );
      
      setAllInstockVehicles(response?.data?.res);

      console.log("response of vehicle ownership00001", response);
    } catch (error) {
    } finally {
    }
  }, [page, Category, selectedYard, vehicleStatus,allInstockVehicles]);

  const allYardsOptions = allyard?.map((item) => ({
    value: item?.id,
    label: item?.yard_name,
  }));

  const vehicleCategorysOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchallInstockVehicles();
  }, [selectedYard, Category, vehicleStatus]);

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchAllYards();
  }, []);

  const UsersData = allInstockVehicles?.vehicles || [];

  console.log("allVehicleOwnerships", allInstockVehicles?.totalCount);

  const userColumn = useMemo(
    () => [
      {
        header: "Client Organisation ",
        accessorKey: "cl_org.cl_org_name",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Vehicle Category  ",
        accessorKey: "vehicle.vehicle_category.name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Make ",
        accessorKey: "vehicle.make",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Model  ",
        accessorKey: "vehicle.model",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Code  ",
        accessorKey: "vehicle.code",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "Yard Name  ",
        accessorKey: "vehicle.yard.yard_name",
        // id: "clsup_org_name", // Ensure unique id
      },
      {
        header: "Action",
        cell: ({ row }) => View(row),
      },
    ],
    [allInstockVehicles?.vehicles]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);


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
    setYardFilter(selectedOption.text);
  };
  
  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
       All Instock Vehicles
      </h1>

      <div className="flex w-full space-x-14 borde">
  <div className="flex flex-col   ml-8">
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
      <div className="flex flex-col   ml-8">
        <label htmlFor="state" className={labelStyle?.data}>
          Select Yard
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleYardSelection}
        >
            <option value="">All Yards</option>
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
      
     
  </div>
      <div>
        {/* {isLoading ? (
          <div className="flex w-full h-screen items-center justify-center">
            <Loading />
          </div>
        ) : ( */}
        {
  allInstockVehicles?.totalCount<1 ? (
    <NoVehicleMessage typeFilter='Instock Vehicles'  catFilter={catFilter}  yardFilter={yardFilter} />
  ) : (
    <div className="w-full">
      {allInstockVehicles?.vehicles && (
        <DataTable data={UsersData} columns={userColumn} />
      )}
      <div className="w-full text-center">
        {allInstockVehicles?.totalCount>0 && (  
          <Pagination
            page={page}
            setPage={setPage}
            limit={limit}
            totalDataCount={allInstockVehicles?.totalCount}
          />
        )}
      </div>
    </div>
  )
}

        </div>
      </div>
   
  );
};

export default AllInstockVehicles;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehicles/instockVehicles/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
