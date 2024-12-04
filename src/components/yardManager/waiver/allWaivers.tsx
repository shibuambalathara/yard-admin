"use client";
import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/utils/axios";
import {
  getSortedRowModel,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MdOutlineViewHeadline } from "react-icons/md";
import Link from "next/link";
import { PiSortAscendingLight, PiSortDescendingLight } from "react-icons/pi";
import { TbSelector } from "react-icons/tb";
import { log } from "console";
import { CiSearch } from "react-icons/ci";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import IndeterminateCheckbox from "@/components/tables/IndeterminateCheckbox";
import { inputStyle, labelStyle } from "@/components/ui/style";
import Pagination from "@/components/pagination/pagination";
import { VehicleState } from "@/utils/staticData";
import EditWaivers from "./editWaivers";
import NoVehicleMessage from "@/components/commonComponents/clientLevelUser/noVehicle";
import Loading from "@/app/(home)/(superAdmin)/loading";
import Spinner from "@/components/commonComponents/spinner/spinner";

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
      status: string;
      vehicle_category: { name: string };
    };
  };
};

const AllWaivers = () => {
  const [sorting, setSorting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [data, setData] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [yardData, setYardData] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [vehicleCategoryFilter, setVehicleCategoryFilter] = useState("");
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [client, setClient] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [limit, setLimit] = useState(5);
  const [catFilter, setCatFilter] = useState("");
  const [clientFilter, setClientFilter] = useState("");
  const [statusFilter2, setStatusFilter2] = useState("");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }, []);

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  useEffect(() => {
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, []);

  const vehicleCategoryOptions = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
     value: item.id,
    label: item.org_name,
  }));
  const handleEditClick = (userId) => {
    setSelectedUserId(userId);
    setEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setEditModalOpen(false);
    // setSelectedUserId(null);
  };

  console.log(selectedRowIds);

  const fetchData = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        page: pages.toString(),
        limit: limit.toString(),
      });

      if (statusFilter) {
        params.append("status", statusFilter);
      }

      if (vehicleCategoryFilter) {
        params.append("vehicle_category_id", vehicleCategoryFilter);
      }
      if (client) {
        params.append("cl_org_id", client);
      }

      const response = await axiosInstance.get(`/waiver?${params.toString()}`);
      setData(response?.data?.res?.waiverVehicles || []);
      setPageCount(response?.data?.res?.totalCount || null);
      console.log("response of vehicle ownership00001", response);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [pages, statusFilter, vehicleCategoryFilter, client]);

  useEffect(() => {
    fetchData();
  }, [pages, fetchData]);

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
        accessorKey: "vehicle_ownership.vehicle.code",
        header: "Vehicle Code",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "waiver.code",
        header: "waiver Code",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "vehicle_ownership.vehicle.make",
        header: "Make",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "vehicle_ownership.vehicle.model",
        header: "Model",
        cell: (info) => info.getValue(),
      },
      //   {
      //     accessorKey: 'vehicle_ownership.vehicle.yard.yard_name',
      //     header: 'Yard Name',
      //     cell: (info) => info.getValue(),
      //   },
      {
        accessorKey: "status",
        header: "Status",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "vehicle_ownership.vehicle.vehicle_category.name",
        header: "Category",
        cell: (info) => info.getValue(),
      },
      {
        id: "view",
        header: "View",
        cell: ({ row }) => (
          <button
            onClick={() => handleEditClick(row.original.id)}
            className="flex justify-center items-center border space-x-1 bg-gray-700 text-white px-2 py-1 rounded-md "
          >
            <p>
              <MdOutlineViewHeadline />
            </p>
            <p rel="noopener noreferrer" className="">
              View
            </p>
          </button>
        ),
      },
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

  const handleCatChange = (e) => {
    const value = e.target.value;
    setVehicleCategoryFilter(value);
    
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
    setStatusFilter(value)
    const selectedOption = e.target.options[e.target.selectedIndex];
    setStatusFilter2(selectedOption.text);
  }
  return (
    <div className="w-full">
      <h1 className="text-center font-roboto md:text-lg font-bold py-2 uppercase">
        waiver
      </h1>
      <div className="grid grid-cols-3 pl-6 pt-5 items-center">
        <div className="flex flex-col   ">
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

            {allClientLevelOrganisations.map((option, index) => (
              <option key={index} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-">
          <div className="flex flex-col w-24">
            <label htmlFor="yard" className={labelStyle?.data}>
             Select Status
            </label>
            <select
              id="status"
              className={inputStyle?.data}
              defaultValue=""
              onChange={handleStatus}
            >
               <option value="">All Status</option>
              {VehicleState.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
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
              onChange={ handleCatChange}
            >
               <option value="">All Vehicle Categories</option>
              {vehicleCategoryOptions.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* <div className="flex h-12 mt-4 ">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Assign Waiver
          </button>
          {modalOpen && <AddWaiver onClose={handleModalClose} selectedRowIds={selectedRowIds}  />}
        </div> */}
      </div>

      
        <div className="w-full p-5">
          {/* {editModalOpen && (
            <div className="relative border ">
              <div className="  absolute top-40 right-0  w-full h-full flex items-center justify-end   z-50  border-green-500 ">
                <div className=" w-full   max-w-sm z-20 ">
                  <EditWaivers
                    userId={selectedUserId}
                    onClose={handleEditModalClose}
                  />
                </div>
              </div>
            </div>
          )} */}

          <div className="">
            {editModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                <EditWaivers
                  userId={selectedUserId}
                  onClose={handleEditModalClose}
                  fetchData={fetchData}
                />
              </div>
            )}
          </div>
          
          <div className="w-full text-center">
          {pageCount < 1 ? (
         <NoVehicleMessage typeFilter="Vehicles" catFilter={catFilter}  clientFilter={clientFilter} statusFilter={statusFilter}/>
        ) : (
          <div className="w-full">
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
                className="border w-44 focus:ring-indigo-500 focus:outline-none block  pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
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
                            {flexRender(
                              header?.column?.columnDef?.header,
                              header.getContext()
                            )}
                            <div className="flex justify-center items-center pl-2">
                              {sorting.find((sort) => sort.id === header.id) ? (
                                sorting.find((sort) => sort.id === header.id)
                                  .desc ? (
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
             
            
            <div className="w-full text-center">
              {pageCount > 0 && (
                <Pagination
                  page={pages}
                  setPage={setPages}
                  limit={limit}
                  totalDataCount={pageCount}
                />
              )}
            </div>
          </div>
        )}
          </div>
        </div>
     
    </div>
  );
};

export default AllWaivers;
