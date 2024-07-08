"use client";
import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '@/utils/axios';
import {
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { MdOutlineViewHeadline } from 'react-icons/md';
import Link from 'next/link';
import { PiSortAscendingLight, PiSortDescendingLight } from 'react-icons/pi';
import { TbSelector } from 'react-icons/tb';
import { CiSearch } from 'react-icons/ci';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import IndeterminateCheckbox from '@/components/tables/IndeterminateCheckbox';
import { inputStyle, labelStyle } from '@/components/ui/style';
import Pagination from '@/components/pagination/pagination';
import { VehicleState } from '@/utils/staticData';
import NoVehicleMessage from '@/components/commonComponents/noVehicle/noVehicle';
import EditIndividualWaiver from "@/components/clientLevelSuperUser/waiver/viewSuperRequestWaiver/individualSuperWaiver"
import Spinner from '@/components/commonComponents/spinner/spinner';


type User = {
  fee_per_day: number;
  status: string;
  id: string;
  waiver: { code: string };
  vehicle_ownership: {
    cl_org: {
      code: string;
      cl_org_name: string;
    };
    vehicle: {
      code: string;
      make: string;
      model: string;
      yard: { yard_name: string };
      status: string;
      vehicle_category: { name: string };
    };
  };
};

const AllRequestedWaiver = () => {
  const [sorting, setSorting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setData] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [yardData, setYardData] = useState([]);
  const [selectYard, setSelectedYard] = useState('');
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [client, setClient] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [yardFilter, setYardFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [limit,setLimit]=useState(5)
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [wavierId, setWavierId] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [children, setChildren] = useState([]);



  const fetchChildren = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_super_org/child/_org`);
      setChildren(response?.data?.res?.clientLvlOrg);
    } catch (error) {
      // toast.error("Failed to fetch children");
      console.log("error fetch children",error);
      
    }
  }, []);
  useEffect(() => {
    
    fetchChildren();
   
  }, []);
  const superClientOptions = children.map(item => ({
    value: item.id,
    label: item.cl_org_name
  }));


  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }, []);

  const fetchYard = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/yard`);
      setYardData(response?.data?.res?.yard);
      
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.error("Error fetching data:", error);
    }
  }, []);

 

  const fetchData = useCallback(async () => {
    if (!client) {
      return;
    }
    try {
      const params = new URLSearchParams({
        page: pages.toString(),
        limit: '5',
        cl_org_id:client,
      });

      if (selectYard) {
        params.append('yard_id', selectYard);
      }

      if (vehicleCategoryFilter) {
        params.append('vehicle_category_id', vehicleCategoryFilter);
      }

      // if (client) {
      //   params.append('client_id', client);
      // }

      if (statusFilter) {
        params.append('status', statusFilter);
      }

      const response = await axiosInstance.get(`/waiver/client?${params.toString()}`);
      setData(response?.data?.res?.waiverVehicles || []);
      setPageCount(response?.data?.res?.totalCount || null);
      console.log("response of vehicle ownership00001", response);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [pages, selectYard, vehicleCategoryFilter, statusFilter]);

  useEffect(() => {
   
    fetchYard();
    FetchAllVehicleCategory();
  }, [ ]);

  useEffect(() => {
    fetchData();
  }, [pages, selectYard, vehicleCategoryFilter, statusFilter]);

  const handleRowSelection = (id: string) => {
    setSelectedRowIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((ids) => ids !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
  
      {
        accessorKey: 'vehicle_ownership.vehicle.code',
        header: 'Vehicle Code',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'waiver.code',
        header: 'waiver Code',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'vehicle_ownership.vehicle.make',
        header: 'Make',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'vehicle_ownership.vehicle.model',
        header: 'Model',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'vehicle_ownership.vehicle.yard.yard_name',
        header: 'Yard Name',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: 'vehicle_ownership.vehicle.vehicle_category.name',
        header: 'Category',
        cell: (info) => info.getValue(),
      },
      {
        id: "view",
        header: "Action ",
        cell: ({ row }) => (
          <div className="flex justify-center relative z-10">
            <View row={row} onEditClick={handleEditClick} />
          </div>
        ),
      },
     ,
    ],
    [selectedRowIds]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: sorting,
      globalFilter: globalFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  const handleYardChange = (e) => {
    setSelectedYard(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setYardFilter(selectedOption.text);
  };

  const handleVehicleCategoryChange = (e) => {
    setVehicleCategoryFilter(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setCategoryFilter(selectedOption.text);
  };

  const handlestatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const handleOrgChange = (e) => {
    setClient(e.target.value);
    const selectedOption = e.target.options[e.target.selectedIndex];
    setRoleFilter(selectedOption.text);
  };

  const handleEditClick = (userId) => {
    setWavierId(userId);
    setEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };

  return (
    <div className="w-full">
      <h1 className='w-full  text-center text-lg font-bold mt-4'>All CREATED WAVIER</h1>
      <div className="grid grid-cols-3 pl-6 pt-5 items-center">
      <div>


<label htmlFor="client" className={labelStyle.data}>Select Client</label>

<select id="client" className={inputStyle.data} onChange={handleOrgChange}>
<option value="">All Categories</option>
  {superClientOptions.map((option, index) => (
    <option key={index} value={option.value}>{option.label}</option>
  ))}
</select> </div>
        <div className="mb-">
          <div className="flex flex-col w-24">
            <label htmlFor="yard" className={labelStyle?.data}>
              Select Yard
            </label>
            <select
              id="yard"
              className={inputStyle?.data}
              defaultValue=""
              onChange={handleYardChange}
            >
              <option value="">ALL Yards</option>
              {yardData.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.yard_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-">
          <div className="flex flex-col ">
            <label htmlFor="vehicleCategory" className={labelStyle?.data}>
              Select Vehicle Category
            </label>
            <select
              id="vehicleCategory"
              className={inputStyle?.data}
              defaultValue=""
              onChange={handleVehicleCategoryChange}
            >
              <option value="">ALL Vehicle Categories</option>
              {vehicleCategory.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>

   

        <div className="mb-">
          <div className="flex flex-col w-24">
            <label htmlFor="status" className={labelStyle?.data}>
              Status
            </label>
            <select
              id="status"
              className={inputStyle?.data}
              defaultValue=""
              onChange={handlestatusChange}
            >
              <option value="">Status</option>
              { VehicleState.map((item,index) => (
                <option key={index} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full ">
              {editModalOpen && 
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
              <EditIndividualWaiver waiverId={wavierId} onClose={handleEditModalClose}  fetchAllWaivers={fetchData} />
            </div>
              }
          </div>

      </div> 
      {pageCount > 0 ? (
      loading ? (
        <div className="flex w-full h-screen items-center justify-center"><Spinner/></div>
      ) : (
        <div className="w-full p-5">
          <div className="mt-0.5">
            <div className="relative rounded-md shadow-sm max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search"
                className="border w-44 focus:ring-indigo-500 focus:outline-none block m-2 pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
              />
            </div>
          </div>
          <div className="mt-2 ring-1 w-full h-fit ring-gray-300 rounded-lg overflow-auto">
            <table className="min-w-full divide-y divide-gray-300 relative">
              <thead className="bg-gray-700 rounded-lg">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id} className="divide-x divide-gray-500">
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        className="py-3.5 uppercase pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2"
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center">
                            {flexRender(header?.column?.columnDef?.header, header.getContext())}
                            <div className="flex justify-center items-center pl-2">
                              {sorting.find((sort) => sort.id === header.id) ? (
                                sorting.find((sort) => sort.id === header.id).desc ? (
                                  <PiSortDescendingLight />
                                ) : (
                                  <PiSortAscendingLight />
                                )
                              ) : (
                                <TbSelector />
                              )}
                            </div>
                          </div>
                        )}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody className="text-black space-x-8">
                {table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className="divide-x divide-gray-300 cursor-pointer hover:bg-indigo-50"
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        key={cell.id}
                        className="px-6 py-3.5 text-sm text-gray-800 border-t max-sm:font-bold border-gray-200"
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-full text-center">
            {pageCount && (
              <Pagination page={pages} setPage={setPages} totalDataCount={pageCount} limit={limit} />
            )}
          </div>
        </div>
      )):(
        <NoVehicleMessage
        typeFilter="vehicles"
        roleFilter={roleFilter}
        statusFilter={statusFilter}
        categoryFilter={categoryFilter}
        selectYard={yardFilter}

      />
      )}
    </div>
  );
};

export default AllRequestedWaiver;

const View = ({ row, onEditClick }) => {
  return (
    <div
    onClick={() => onEditClick(row.original.id)}
     className="flex justify-center items-center py-2 px-4   space-x-2 bg-gray-700 rounded-md  text-white">
      {/* <div className="flex flex-col justify-center items-center bg-red-500"> */}
      <p>
        <MdOutlineViewHeadline />
      </p>
      {/* <button
       
        className=" "
      > */}
       
            <span>  View </span>
      {/* </button> */}
      {/* </div> */}
    </div>
  );
};

