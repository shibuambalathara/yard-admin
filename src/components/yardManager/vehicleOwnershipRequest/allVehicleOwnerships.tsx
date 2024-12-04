"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";

import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import {VehicleState} from "@/utils/staticData"
import { MdOutlineViewHeadline } from "react-icons/md";

import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";

const AllVehicleOwnerships = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [limit,setLimit]=useState(5)
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setCategory] = useState("");
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState("");
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [client, setClient] = useState("");
  const [ownershipStatus,setOwnerShipStatus]=useState("")
  const [catFilter, setCatFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  //  toast.success(success)
  // toast.error(error)
  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      //   console.log("reponse of clientlevelorg ", response);

      
    } catch (error) {
      console.log("error", error);
      // toast.error(error?.response?.data?.message);
    }
  }, []);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      console.log("cat", response);

      setAllVehicleCategory(response?.data?.vehicleCategory);

     
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }, []);



  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
     value: item.id,
    label: item.org_name,
  }));
  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("filteredData ", filteredData);

  const FetchVehicleOwnership = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });


      if (Category) {
        params.append("vehicle_category_id", Category);
      }
      if (client) {
        params.append("cl_org_id", client);
      }

      if(ownershipStatus){
        params.append("status",ownershipStatus);

      }

      const response = await axiosInstance.get(
        `/ownership/?${params.toString()}`
      );

      console.log("api", `/ownership/?${params.toString()}`);

      //   `//?page=1&limit=5&client_org_id=${client}&status=PENDING`
      // );
      // console.log("all users", response);
      setFilteredData(response?.data?.res);
     
    } catch (error) {
    
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log("filteredData", filteredData);
  useEffect(() => {
    FetchAllVehicleCategory(); // Call fetchData directly inside useEffect
    FetchClientLevelOrgs();

  }, []);
  useEffect(() => {
    FetchVehicleOwnership(); // Call fetchData directly inside useEffect
  }, [page, Category, client,ownershipStatus]);

  const UsersData = filteredData?.vehicleOwnership || [];

  const userColumn = useMemo(
    () => [
      {
        header: "Client Organisation ",
        accessorKey: "cl_org.org_name",
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
        accessorKey: "vehicle.yard.org_name",
        // id: "clsup_org_name", // Ensure unique id
      },

      {
        header: "status ",
        accessorKey: "status",
        // id: "code", // Ensure unique id
      },

      {
        header: "View",
        cell: ({ row }) => View(row),
      },
    ],
    [filteredData]
  );

  // console.log("filetered data from clientLevelSuperOrg",filteredData);
  const allYardsOptions = allyard?.map((item) => ({
     value: item.id,
    label: item.org_name,
  }));



  const handleCatChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };
  const handleOrgChange = (e) => {
    const value = e.target.value;
    setClient(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setClientFilter(selectedOption.text);
  };

  const handleStatus=(e)=>{

    const value = e.target.value;
    setOwnerShipStatus(value)
    const selectedOption = e.target.options[e.target.selectedIndex];
    setStatusFilter(selectedOption.text);
  }
  
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto md:text-lg font-bold py-2 uppercase">
        Vehicle Ownership
      </h1>

      <div className=" grid lg:grid-cols-3 grid-cols-1 place-items-center mt-6  ">
        <div className="flex flex-col  lg:mr-16  ">
          <label htmlFor="state" className={labelStyle?.data}>
            Select Client
          </label>
          <select
            id="state"
            className={inputStyle?.data}
            defaultValue=""
            onChange={handleOrgChange}
          >
            <option value="">All Client</option>
            {/* <option value="">ALL STATE</option> */}

            {allClientLevelOrganisations.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>

       

        <div className="flex flex-col lg:mr-16  ">
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
            {/* <option value="">ALL STATE</option> */}

            {vehicleCategorys.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
          {/* {errors.state && (
              <p className="text-red-500">State is required</p>
                          )} */}
        </div>
        <div className="flex flex-col lg:mr-16  ">
        <label htmlFor="state" className={labelStyle?.data}>
         Select Status
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleStatus}
        >
          <option value="">All Status</option>
          {/* <option value="">ALL STATE</option> */}

          {VehicleState.map((option, index) => (
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
      
      {filteredData?.totalCount < 1 ? (
         <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter}  yardFilter={clientFilter} statusFilter={statusFilter}/>
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

export default AllVehicleOwnerships;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md px-2 ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehicleOwnership/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="max-md:text-xs"
      >
        View
      </Link>
    </div>
  );
};
