"use client"
  import { useState, useEffect, useMemo } from "react";
import DataTable from "@/components/tables/dataTable";
import { Role } from "@/utils/staticData";
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
import CreateClientLevelOrg from "@/components/superAdmin/organisationManagement/clientLevelOrg/addClientLevelOrgs";
import Pagination from "@/components/pagination/pagination";
import { Country, State, states } from "@//utils/staticData";
import CreateYard from './createYard'
import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";
const AllYards = () => {
  const [roleFilter, setRoleFilter] = useState("CLIENT_LEVEL_USER");
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const [filterDistricts, setFilterDistricts] = useState([]);
  const [selectDistrict, setSelectDistrict] = useState('');
  const handleModalClose = () => {
    setModalOpen(false);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const fetchData = async () => {
    setIsLoading(true);
   
  
    try {
      const response = await axiosInstance.get(
        `/yard?page=1&limit=5&country=INDIA&state=${selectedState}&district=${selectDistrict}`
      );
      console.log("all users",response?.data?.res?.yard);
      setFilteredData(response?.data?.res?.yard);
      
      
      setSuccess({
        text: response?.data?.message,
      });
    } catch (error) {
      setError({
        text: error?.response?.data?.message,
      });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  };

  // console.log("filteredData from clientLevelsuperOrg", filteredData);


  console.log('filt',filteredData);
  useEffect(() => {
    fetchData(); // Call fetchData directly inside useEffect
  }, [selectedState,selectDistrict ]);
  const UsersData = filteredData || [];

  const userColumn = useMemo(
    () => [
     {
            header: "yard name",
            accessorKey: "yard_name",
            // id: "clsup_org_name", // Ensure unique id
     },
      {
        header: "state",
        accessorKey: "state",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "district",
        accessorKey: "district",
        // id: "clsup_org_category_name", // Ensure unique id
      },
      {
        header: "Code",
        accessorKey: "code",
        // id: "code", // Ensure unique id
      },
      {
        header: "Country",
        accessorKey: "country",
        // id: "country", // Ensure unique id
      },
      {
        header: "ID",
        accessorKey: "id",
        // id: "id", // Ensure unique id
      },
      {
        id: "viewUser",
        header: "View User",
        cell: ({ row }) => View(row),
      },
      
    ],
    [filteredData]
  );


  const handleStateChange = (e) => {
    const selectedState = e.target.value.toUpperCase();
    setSelectedState(selectedState);
    const stateData = states.find(state => state.state.toUpperCase() === selectedState);
    setFilterDistricts(stateData ? stateData.districts : []);
  };
   const handleDistrictChange=(e)=>{
    const selectedDist =e.target.value;
     setSelectDistrict(selectedDist)
   }
  return (
    
    <div className="mt-8">
      <div className="grid grid-cols-3 px-20  gap-4">

      <div className="">
          <button
            // href={`/userManagement/createUser`}
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add User
          </button>
          {modalOpen && (
            <CreateYard  onClose={handleModalClose}/>
          )}
        </div>
      {/*  */}
      <div className="flex flex-col w-fit ">
  <label htmlFor="state">
    Select State
  </label>
  <select
    id="state"
    className={inputStyle.data}
    defaultValue=""
    onChange={handleStateChange}
  >
    <option value="" disabled hidden>
      Select state
    </option>
    {states.map((option, index) => (
      <option key={index} value={option.state}>
        {option.state}
      </option>
    ))}
  </select>
  {/* {errors.state && (
    <p className="text-red-500">State is required</p>
  )} */}
</div>
            



            <div className="flex flex-col w-fit">
  <label htmlFor="district" className=''>
    Select district
  </label>
  <select
    id="district"
    className={inputStyle.data}
    defaultValue=""
    onChange={handleDistrictChange}
  >
    <option value="" disabled hidden>
      Select district
    </option>
    {filterDistricts.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
  {/* {errors.state && (
    <p className="text-red-500">State is required</p>
  )} */}
  </div>
  </div>

      {
          filteredData && <DataTable data={UsersData} columns={userColumn} />

          /* )} */
        }
    </div>
  )
}

export default AllYards


const View = (row) => {
  // console.log("from view", row.original.id);
  return (
    <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
      <p>
        <MdOutlineViewHeadline />
      </p>
      <Link
        href={`/organisationManagement/yardManagement/${row.original.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className=""
      >
        View
      </Link>
    </div>
  );
};