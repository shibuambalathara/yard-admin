"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { buttonStyle } from "../ui/style";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowUp } from "react-icons/io";
import { MdKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";
import { PiSortDescendingLight, PiSortAscendingLight } from "react-icons/pi";
import { TbSelector } from "react-icons/tb";
import Loader from "@/app/(home)/(superAdmin)/loading";

const DataTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className="w-full mx-auto flex justify-center items-center">
     
        <div className="w-full p-5">
          <div className="mt-0.5">
            <div className="relative rounded-md shadow-sm max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder="search"
                className="border w-44 focus:ring-indigo-500 focus:outline-none block m-2 pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
              />
            </div>
          </div>
          <div className="mt-2 ring-1 w-full h-fit  ring-gray-300 rounded-lg overflow-auto">
            <table className="min-w-full divide-y divide-gray-300 relative">
              <thead className="bg-gray-700 rounded-lg">
                {table?.getHeaderGroups().map((headerGroup) => (
                  <tr className="divide-x divide-gray-500" key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        className="py-3.5 uppercase pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2"
                        key={header.id}
                        onClick={header?.column?.getToggleSortingHandler()}
                      >
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
              <tbody className="text-black space-x-8">
                {table?.getRowModel()?.rows?.map((row) => (
                  <tr
                    className="divide-x divide-gray-300 cursor-pointer hover:bg-indigo-50"
                    key={row.id}
                  >
                    {row?.getVisibleCells().map((cell) => (
                      <td
                        className="px-6 py-3.5 text-sm text-gray-800 border-t max-sm:font-bold border-gray-200"
                        key={cell.id}
                      >
                        {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      
    </div>
  );
};

export default DataTable;
