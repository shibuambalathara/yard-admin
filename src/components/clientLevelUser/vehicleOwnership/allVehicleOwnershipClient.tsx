"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role, VehicleState } from "@/utils/staticData";
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

const AllVehicleOwnershipClient = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [vehicleStatus, setVehicleStatus] = useState('');
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState('');
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState('');
  const [allVehicleOwnerships,setAllVehicleOwerships]=useState(null)
  const [limit, setLimit] = useState(5);
  const [catFilter, setCatFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
   

      setAllVehicleCategory(response?.data?.vehicleCategory);
    

      
    } catch (error) {
      console.log("error from FetchAllVehicleCategory",error);
      
      // toast.error("Failed to fetch vehicle categories");
      
    }
  }, []);

  const FetchAllYards = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);

   
      setAllYard(response?.data?.res?.yard);
     
    } catch (error) {
      console.log("error from FetchAllYards",error);

      // toast.error("Failed to fetch vehicle categories");
    }
  }, []);

  const FetchAllVehicleOwnerships = 
  // useCallback(
    async () => {
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
          if(vehicleStatus){
            params.append('status',vehicleStatus);

          }

      const response = await axiosInstance.get(
        `ownership/client/?${params.toString()}`
      );
       
      console.log("params",params);

      console.log("all vehicle ownership",response);
      
      setAllVehicleOwerships(response?.data?.res)

      setFilteredData(response?.data?.res?.totalCount);
      
      
      console.log("response of vehicle ownership00001", response);
    } catch (error) {
      console.log("error",error);
      
    } finally {
      setLoading(true)
    }
  }
  // [page, limit,Category, selectedYard, vehicleStatus]
// );
// // 
  const allYardsOptions = allyard?.map((item) => ({
     value: item.id,
    label: item.org_name,
  }));

 
  

  const vehicleCategorysOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

 

  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus,page,filteredData]);

  useEffect(() => {
    FetchAllVehicleCategory();

    FetchAllYards();
  }, []);

  const UsersData = allVehicleOwnerships?.vehicleOwnership || [];

  
  

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
    [allVehicleOwnerships?.vehicleOwnership]
  );


  // console.log("filetered data from allVehicleOwnerships?.totalCount",allVehicleOwnerships?.totalCount);

 
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
  const handleOwnershipStatus = (e) => {
    const value = e.target.value;
    setVehicleStatus(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setStatusFilter(selectedOption.text);
  };
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto md:text-lg font-bold py-2 uppercase">
        Vehicle Ownership 
      </h1>

  <div className="grid md:grid-cols-3 grid-cols-2 w-full md:space-x-14 borde">
  <div className="flex flex-col ml-2  md:ml-5">
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
      <div className="flex flex-col   md:ml-8">
        <label htmlFor="state" className={labelStyle?.data}>
          Select Yard
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleYardSelection}
        >
          <option value="">All Category</option>
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
      
      <div className="flex flex-col ml-2  md:ml-8">
        <label htmlFor="state" className={labelStyle?.data}>
          Select Status
        </label>
        <select
          id="state"
          className={inputStyle?.data}
          defaultValue=""
          onChange={handleOwnershipStatus}
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
  
      <div className="flex w-full px-8 justify-between"></div>
      <div>
        {filteredData < 1 ? (
          <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter}  yardFilter={yardFilter} statusFilter={statusFilter}/>
        ) : (
          <div className="w-full">
             
              <DataTable data={UsersData} columns={userColumn} />
            
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

export default AllVehicleOwnershipClient;

const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md px-2">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/vehicleOwnershipClientOrg/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};
