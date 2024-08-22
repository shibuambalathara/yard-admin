"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import DataTable from "@/components/tables/dataTable";
import Link from "next/link";
import axiosInstance from "@/utils/axios";
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import {CategoryFilter, CityFilter,ClientFilter,Search,StateFilter} from "@/components/reuseableComponent/filter/filters"
import { SelectComponentWithOnchange } from "../ui/fromFields";
import { RepoStatus, RepoStatus2, VehicleState } from "@/utils/staticData";

const AllClosed = (props) => {

const {childrenRequire,user} =props

  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [registrationNum, setRegistrationNum] = useState(null);
  const [catFilter, setCatFilter] = useState("");
  const [vehicleStatus, setVehicleStatus] = useState("");
  const [limit, setLimit] = useState(5);
  const [Category, setVehiclecat] = useState('');
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState('');
  const [allVehicleOwnerships,setAllVehicleOwerships]=useState(null)
  const [yardFilter, setYardFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [children, setChildren] = useState([]);
  const [yardId, setYardId] = useState("");
  const [client, setClient] = useState('');


  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      console.log("cat", response);

      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      console.log(error);
    }
  }, []);

  

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

  useEffect(() => {
    FetchAllVehicleCategory()
    fetchChildren();
    // fetchAllYards();
  }, []);


  const FetchAllVehicleOwnerships = 
  // useCallback(
    async () => {
    try {
        const params = new URLSearchParams({
            page: page.toString(),
            limit: limit.toString(),
            status:"CLOSED"
          });
          if (childrenRequire && client) {
            params.append('cl_org_id', client);
          } 
        
          if (Category) {
            params.append('vehicle_category_id',Category);
          }
          if (selectedYard) {
            params.append('yard_id',selectedYard);
          }
         

      const response = await axiosInstance.get(
        `/repossession/vehicle?${params.toString()}`
      );
       
      console.log("params",params);

      console.log("all vehicle ownership",response);
      
      setAllVehicleOwerships(response?.data?.res?.repoVehicle )

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

  console.log(children);

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const superClientOptions = children.map(item => ({
    value: item.id,
    label: item.org_name
  }));
  const handleClient = (e) =>{
    const selectedOption = e.target.options[e.target.selectedIndex];
    setClient(e.target.value);
    // setRoleFilter(selectedOption.text)
    // setClientSelection(true)
     }
     const handleOwnershipStatus = (e) => {
      const value = e.target.value;
      setVehicleStatus(value);
      
    };
     const handleYardChange = (event) => {
      const selectedYardId = event.target.value;
      setYardId(selectedYardId);
      // setValue("yard_id", selectedYardId); // Set the value in the form
    };
    
 console.log(client);
  
  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus,page,filteredData,client]);

  const UsersData = allVehicleOwnerships || [];

  const userColumn = useMemo(
    () => [
      {
        header: "code",
        accessorKey: "code",
      },
      // {
      //   header: "Client",
      //   accessorKey: "cl_org.org_name",
      // },
      {
        header: "make",
        accessorKey: "make",
      },
      { header: "Category", accessorKey: "vehicle_category.name" },
      {
        header: "model",
        accessorKey: "model",
      },
      {
        header: "Status",
        accessorKey: "status",
      },
      {
        header: "Organization",
        accessorKey: "cl_org.org_name",
      },
      {
        header: "Category ",
        accessorKey: "vehicle_category.name",
      },
    
      {
        header: "View",
        cell: ({ row }) => <View row={row}  user={user}/>,
      },
    ],
    [filteredData]
  );

  const handleCatChange = (e) => {
    const value = e.target.value;
    setVehiclecat(value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCatFilter(selectedOption.text);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
      Closed Vehicles
      </h1>
      <div className={` grid  items-end px-8   ${user==='super'?'grid-cols-4 gap-x-48': 'grid-cols-3 justify-between' }`}>
        <div className="flex flex-col   ">
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
        
      {/* <SelectComponentWithOnchange
                label="Select a Role"
                name="role"
                options={Role}
                register={register}
                errors={errors}
                required={true}
                value={role} // Pass controlled value
                onChangeHandler={handleRoleChange}
              /> */}


        { childrenRequire&&(
        <div className="flex flex-col">
          <label htmlFor="client" className={labelStyle.data}>Select Client</label>
         
          <select id="client" className={inputStyle.data} onChange={handleClient}>
          <option value="">Select Client</option>
            {superClientOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>)}
        
      </div>
      <div>
        {filteredData < 1 ? (
          <NoVehicleMessage typeFilter="Closed Vehicles" catFilter={catFilter} />
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

export default AllClosed;

const View = ({ row ,user}) => {
  const href = 
   user === 'client'
  ? `/closedVehicles/${row.original.id}`
  : `/superClosedVehicles/${row.original.id}`;
  return (
    <div className="flex justify-center items-center border space-x-1 w-20 bg-gray-700 text-white p-1 rounded-md">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        View
      </Link>
    </div>
  );
};
