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

const AllRepoDetails = (props) => {

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

  const [client, setClient] = useState('');
  const fetchChildren = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_super_org/child/_org`);
      setChildren(response?.data?.res?.clientLvlOrg);
      console.log(response);
      
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log("error",error);
      
    }
  }, []);

  useEffect(() => {
    // fetchAllVehicleCategory();
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
          if(vehicleStatus){
            params.append('status',vehicleStatus);

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
    value: item?.id,
    label: item?.yard_name,
  }));

  console.log(children);
  
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
    
 console.log(client);
  
  useEffect(() => {
    FetchAllVehicleOwnerships();
  }, [selectedYard, Category, vehicleStatus,page,filteredData,client]);

  const UsersData = allVehicleOwnerships || [];

  const userColumn = useMemo(
    () => [
      // {
      //   header: "Client",
      //   accessorKey: "cl_org.org_name",
      // },
      {
        header: "make",
        accessorKey: "make",
      },
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
        header: "code",
        accessorKey: "code",
      },
      {
        header: "View",
        cell: ({ row }) => <View row={row}  user={user}/>,
      },
    ],
    [filteredData]
  );

  const handleCatChange = (e) => {
    setCatFilter(e.target.value);
  };

  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">
       All Repo Vehicles
      </h1>
      <div className={` grid  items-end justify-between px-3 ${user==='super'?'grid-cols-3': 'grid-cols-2 ' }`}>
        <div className="flex flex-col w-40 ml-5">
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
            {vehicleCategory.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
        
        { childrenRequire&&(
        <div className="flex flex-col ml-5">
          <label htmlFor="client" className={labelStyle.data}>Select Client</label>
         
          <select id="client" className={inputStyle.data} onChange={handleClient}>
          <option value="">Select Client</option>
            {superClientOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>)}
        <div className="flex justify-end w-full h-fit">
          <Link
            href={`${childrenRequire?"/superUserRepoVehicles/addRepoVehicle":"/repoVehicle/addRepoVehicle"}`}
            className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600 transition duration-200 mb-1 mr-6"
          >
            Add
          </Link>
        </div>
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

export default AllRepoDetails;

const View = ({ row ,user}) => {
  const href = 
   user === 'client'
  ? `/repoVehicle/${row.original.id}`
  : `/superUserRepoVehicles/${row.original.id}`;
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
