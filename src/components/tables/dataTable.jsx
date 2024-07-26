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
import { CiSearch } from "react-icons/ci";
import { PiSortDescendingLight, PiSortAscendingLight } from "react-icons/pi";
import { TbSelector } from "react-icons/tb";

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
    <div className="w-full mx-auto flex flex-col items-center p-2 sm:p-8">
      <div className="w-full max-w-full">
        <div className="relative rounded-md shadow-sm max-w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <CiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" />
          </div>
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="Search"
            className="border w-full sm:w-44 focus:ring-indigo-500 focus:outline-none block pl-10 rounded-md border-gray-400 p-2 placeholder:font-semibold"
          />
        </div>
      </div>
      <div className="mt-4 ring-1 w-full h-fit ring-gray-300 rounded-lg overflow-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-700 rounded-lg">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="divide-x divide-gray-500" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="py-3.5 pl-2 pr-1 text-sm font-semibold text-gray-100 text-left"
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
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
          <tbody className="text-black divide-y  divide-gray-300">
            {table.getRowModel().rows.map((row) => (
              <tr
                className="hover:bg-indigo-50 divide-x divide-gray-300"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-2 py-3.5 text-sm  text-gray-800 border-t max-sm:font-bold border-gray-200 text-left normal-case"
                  >
                    <div className="flex justify-start">{flexRender(cell.column.columnDef.cell, cell.getContext())}</div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
