
import React, { useState, useEffect } from 'react';
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
import IndeterminateCheckbox from './IndeterminateCheckbox';
import { MdOutlineViewHeadline } from 'react-icons/md';
import Link from 'next/link';
import Pagination from '../pagination/pagination';
import { PiSortAscendingLight, PiSortDescendingLight } from 'react-icons/pi';
import { TbSelector } from 'react-icons/tb';
import { log } from 'console';
import { CiSearch } from 'react-icons/ci';
import AddWaiver from '../clientLevelUser/waiver/addWaiver';

type User = {
  cl_org: {
    code: string
    cl_org_name: string
  
  }
  id:string
  vehicle: {
    code: string
    make: string
    model: string
    yard: { yard_name: string }
    status: string
    vehicle_category: { name: string }
  }
}

const SelectionTable = () => {
  const [sorting, setSorting] = useState([]);
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [data, setData] = useState<User[]>([]);
  const [pageCount, setPageCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  console.log(selectedRowIds);
  
 
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/waiver/vehicle?page=${pages}&limit=2`);
      console.log('data',response);
      setData(response?.data?.res?.ownerships || []);
      setPageCount(response?.data?.res?.totalCount || null);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pages]);

  const handleRowSelection = (id: string) => {
    setSelectedRowIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(ids => ids !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const columns = React.useMemo<ColumnDef<User>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className="px-1">
            <IndeterminateCheckbox
              {...{
                checked: selectedRowIds.includes(row.original.id),
                onChange: () => handleRowSelection(row.original.id),
              }}
            />
          </div>
        ),
      },
      // {
      //   accessorKey: 'cl_org.code',
      //   header: 'Organization Code',
      //   cell: info => info.getValue(),
      // },
      // {
      //   accessorKey: 'cl_org.cl_org_name',
      //   header: 'Organization Name',
      //   cell: info => info.getValue(),
      // },
      {
        accessorKey: 'vehicle.code',
        header: 'Vehicle Code',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'vehicle.make',
        header: 'Make',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'vehicle.model',
        header: 'Model',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'vehicle.yard.yard_name',
        header: 'Yard Name',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'vehicle.status',
        header: 'Status',
        cell: info => info.getValue(),
      },
      {
        accessorKey: 'vehicle.vehicle_category.name',
        header: 'Category',
        cell: info => info.getValue(),
      },
      {
        id: 'view',
        header: 'Action',
        cell: ({ row }) => (
          <div className="flex justify-center items-center border space-x-1 bg-gray-700 text-white p-1 rounded-md ">
            <p>
              <MdOutlineViewHeadline />
            </p>
            <Link
              href={`/waivers/${row.original.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className=""
            >
              View
            </Link>
          </div>
        ),
      },
    ],
    [selectedRowIds]
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting:sorting,
      globalFilter:globalFilter,
    },
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full">
   
      {loading ? (
        <div className="flex w-full h-screen items-center justify-center">Loading...</div>
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
                placeholder="search"
                className="border w-44 focus:ring-indigo-500 focus:outline-none block m-2 pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
              />
            </div>
          </div>
          <div className="mt-2 ring-1 w-full h-fit  ring-gray-300 rounded-lg overflow-auto">
          <table className="min-w-full divide-y divide-gray-300 relative">
            <thead className='bg-gray-700 rounded-lg'>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className='divide-x divide-gray-500'>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} colSpan={header.colSpan} className="py-3.5 uppercase pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2">
                      {header.isPlaceholder ? null : (
                          <div className="flex items-center ">
                            {flexRender(
                              header?.column?.columnDef?.header,
                              header.getContext()
                            )}
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
            <tbody className='text-black space-x-8'>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className='divide-x divide-gray-300 cursor-pointer hover:bg-indigo-50'>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-6 py-3.5 text-sm text-gray-800 border-t max-sm:font-bold border-gray-200">
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
              <Pagination
                page={pages}
                setPage={setPages}
                totalDataCount={pageCount}
              />
            )}
          </div>
        </div>
      )}

<div className="flex w-full px-8 justify-between">
        <div className="flex justify-end w-full">
          <button
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Add Waiver
          </button>
          {modalOpen && <AddWaiver onClose={handleModalClose}  selectedRowIds={selectedRowIds}/>}
        </div>
      </div>
    </div>
  );
};

export default SelectionTable;
