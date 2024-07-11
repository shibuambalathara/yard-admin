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

const SmallGrid = ({ data, columns }) => {
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
    <div className="p-4  max-w-4xl mx-auto">
      <div className="mt-0.5">
            <div className="relative rounded-md shadow-sm max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <CiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" />
              </div>
              <input
                type="text"
                value={filtering}
                onChange={(e) => setFiltering(e.target.value)}
                placeholder="Search"
                className="border w-44 focus:ring-indigo-500 focus:outline-none block mb-1 pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
              />
            </div>
          </div>
      <div className="border border-gray-300 rounded-t-lg w-full">
        <div className="grid grid-cols-3 divide-y divide-gray-300 bg-gray-700 text-white rounded-t-lg w-full">
          {table.getHeaderGroups().map((headerGroup) => (
            <div className="contents" key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <div
                  className="py-2 px-4 text-left flex items-center justify-between   border-gray-500"
                  key={header.id}
                  onClick={header?.column?.getToggleSortingHandler()}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(header?.column?.columnDef?.header, header.getContext())}
                      <div className="ml-2">
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
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        {table.getRowModel().rows.map((row) => (
          <div className="grid grid-cols-3 divide-y divide-gray-300 bg-white" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <div className="py-2 px-4 border-r border-b border-gray-300" key={cell.id}>
                <div className="text-sm text-gray-900 flex justify-start">
                  {flexRender(cell?.column?.columnDef?.cell, cell.getContext())}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmallGrid;
