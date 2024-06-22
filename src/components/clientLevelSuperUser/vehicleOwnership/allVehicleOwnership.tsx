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
import { MdOutlineViewHeadline } from "react-icons/md";
import Pagination from "@/components/pagination/pagination";
import { inputStyle, labelStyle } from "@/components/ui/style";

const AllSuperVehicleOwnership = () => {
  const [filteredData, setFilteredData] = useState(null);
  const [page, setPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [vehicleStatus, setVehicleStatus] = useState('');
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [Category, setVehiclecat] = useState('');
  const [allyard, setAllYard] = useState([]);
  const [selectedYard, setSelectedYard] = useState('');
  const [allVehicleOwnerships, setAllVehicleOwerships] = useState([]);
  const [children, setChildren] = useState([]);
  const [client, setClient] = useState('');

  const fetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      toast.error("Failed to fetch vehicle categories");
    }
  }, []);

  const fetchChildren = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_super_org/all/children`);
      setChildren(response?.data?.res?.cl_org);
    } catch (error) {
      toast.error("Failed to fetch children");
    }
  }, []);

  const fetchAllYards = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);
      setAllYard(response?.data?.res?.yard);
    } catch (error) {
      toast.error("Failed to fetch yards");
    }
  }, []);

  const fetchAllVehicleOwnerships = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '10',cl_org_id:client });

      
      if (Category) params.append('vehicle_category_id', Category);
      if (selectedYard) params.append('yard_id', selectedYard);
      if (vehicleStatus) params.append('status', vehicleStatus);

      const response = await axiosInstance.get(`ownership/client/?${params.toString()}`);
      setAllVehicleOwerships(response?.data?.res?.vehicleOwnership);
      toast.success("Failed to fetch vehicle ownerships");
    } catch (error) {
      toast.error(" fetch vehicle ownerships");
    } finally {
      setIsLoading(false);
    }
  }, [page, Category, selectedYard, vehicleStatus, client]);

  const superClientOptions = children.map(item => ({
    value: item.id,
    label: item.cl_org_name
  }));

  const allYardsOptions = allyard.map(item => ({
    value: item.id,
    label: item.yard_name,
  }));

  const vehicleCategoryOptions = vehicleCategory.map(item => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    fetchAllVehicleCategory();
    fetchChildren();
    fetchAllYards();
  }, []);

  useEffect(() => {
    fetchAllVehicleOwnerships();
  }, [page, Category, selectedYard, vehicleStatus, client]);

  const userColumns = useMemo(() => [
    { header: "Client Organisation", accessorKey: "cl_org.cl_org_name" },
    { header: "Vehicle Category", accessorKey: "vehicle.vehicle_category.name" },
    { header: "Make", accessorKey: "vehicle.make" },
    { header: "Model", accessorKey: "vehicle.model" },
    { header: "Code", accessorKey: "vehicle.code" },
    { header: "Yard Name", accessorKey: "vehicle.yard.yard_name" },
    { header: "Status", accessorKey: "status" },
    { header: "Action", cell: ({ row }) => View(row) },
  ], [filteredData]);

  const handleCategorySelect = (e) => setVehiclecat(e.target.value);
  const handleYardSelection = (e) => setSelectedYard(e.target.value);
  const handleOwnershipStatus = (e) => setVehicleStatus(e.target.value);
  const handleClient = (e) => setClient(e.target.value); 

 console.log(client);
 
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto text-lg font-bold py-2 uppercase">Vehicle Ownership</h1>
      <div className="flex w-full space-x-14">
        <div className="flex flex-col ml-8">
          <label htmlFor="client" className={labelStyle.data}>Select Client</label>
         
          <select id="client" className={inputStyle.data} onChange={handleClient}>
          <option value="">All Categories</option>
            {superClientOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ml-8">
          <label htmlFor="category" className={labelStyle.data}>Select Category</label>
          <select id="category" className={inputStyle.data} onChange={handleCategorySelect}>
            <option value="">All Categories</option>
            {vehicleCategoryOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ml-8">
          <label htmlFor="yard" className={labelStyle.data}>Select Yard</label>
          <select id="yard" className={inputStyle.data} onChange={handleYardSelection}>
            <option value="">All Yards</option>
            {allYardsOptions.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col ml-8">
          <label htmlFor="status" className={labelStyle.data}>Status</label>
          <select id="status" className={inputStyle.data} onChange={handleOwnershipStatus}>
            <option value="">Select Status</option>
            {VehicleState.map((option, index) => (
              <option key={index} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex w-full px-8 justify-between"></div>
      <div>
        {isLoading ? (
          <div className="flex w-full h-screen items-center justify-center"><Loading /></div>
        ) : (
          <DataTable data={allVehicleOwnerships} columns={userColumns} />
        )}
      </div>
    </div>
  );
};

export default AllSuperVehicleOwnership;

const View = (row) => (
  <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md">
    <p><MdOutlineViewHeadline /></p>
    <Link href={`/vehicleSuperOwnership/${row.original.id}`} target="_blank" rel="noopener noreferrer">View</Link>
  </div>
);
