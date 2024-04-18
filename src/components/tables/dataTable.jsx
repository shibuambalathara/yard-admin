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

const DataTable = ({ data, columns }) => {
  // console.log(data);
  // console.log(columns);

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

  // console.log("table", table);
  return (
    <div className=" w-full mx-auto flex justify-center items-center  ">
      <div className=" w-full   p-5 ">
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
              className=" border  w-44 focus:ring-indigo-500 focus:outline-none block m-2 pl-10  rounded-md border-gray-400 p-1 placeholder:font-semibold "
            />
          </div>
        </div>
        {/* <div>
          <input
            type="text"
            value={filtering}
            onChange={(e) => setFiltering(e.target.value)}
            placeholder="search"
            className=" border  w-44 focus:ring-indigo-500 focus:border-indigo-500 block m-2 pl-10 sm:text-sm border-gray-600 "
          />
        </div> */}
        <div className="mt-2 ring-1 w-full h-96 ring-gray-300 rounded-lg overflow-auto  ">
          <table className="min-w-full divide-y divide-gray-300 relative ">
            <thead className="bg-blue-800 rounded-lg ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="divide-x divide-gray-500" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    console.log("from inside ", table.getCanNextPage());

                    return (
                      // <th
                      //   className="py-3.5 pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2  "
                      //   key={header.id}
                      //   onClick={header.column.getToggleSortingHandler()}
                      // >
                      //   {header.isPlaceholder ? null : (
                      //     <div className="flex items-center ">
                      //       {flexRender(
                      //         header.column.columnDef.header,
                      //         header.getContext()
                      //       )}
                      //       <div className="flex pl-2">
                      //       {
                      //         { asc: <PiSortAscendingLight className="" />, desc: <PiSortDescendingLight/> }[
                      //           header.column.getIsSorted() ?? null                              ]
                      //       }
                      //       </div>
                      //     </div>
                      //   )}
                      // </th>

                      <th
                        className="py-3.5 pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2"
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {header.isPlaceholder ? null : (
                          <div className="flex items-center">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            <div className="flex pl-2">
                              {sorting.find((sort) => sort.id === header.id) ? ( //the first find is used to check for the existence of sorting information,
                                sorting.find((sort) => sort.id === header.id)
                                  .desc ? ( //the second find is used to access the desc property of that sorting information
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
                    );
                  })}
                </tr>
              ))}
            </thead>

            <tbody className="text-black space-x-8">
              {table.getRowModel().rows.map((row) => (
                <tr
                  className="divide-x divide-gray-300 cursor-pointer hover:bg-indigo-50"
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      className="px-6 py-3.5 text-sm text-gray-800 border-t max-sm:font-bold border-gray-200  "
                      key={cell.id}
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

        <div className="space-x-10 my-4 flex  justify-between items-center">
          <div className="w-full  space-x-4">
            <button
              className={`${buttonStyle.data}  ${
                !table.getCanPreviousPage()
                  ? "bg-blue-100 text-black"
                  : " bg-blue-800"
              }`}
              onClick={() => table.setPageIndex(0)}
            >
              First page
            </button>
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={() => table.previousPage()}
              className={`${buttonStyle.data}  ${
                !table.getCanPreviousPage()
                  ? "bg-blue-100 text-black"
                  : " bg-blue-800"
              }`}
            >
              Previous page
            </button>
            <button
              disabled={!table.getCanNextPage()}
              onClick={() => table.nextPage()}
              className={`${buttonStyle.data}  ${
                !table.getCanNextPage()
                  ? "bg-blue-100 text-black "
                  : " bg-blue-800"
              }`}
            >
              Next page {}
            </button>
            <button
              className={`${buttonStyle.data}  ${
                !table.getCanNextPage() ? "bg-blue-100 " : " bg-blue-800"
              }`}
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last page
            </button>
          </div>
          <div className="flex  w-full justify-between">
            <span className="flex items-center gap-1 border px-2 py-1">
              <div>Page</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} of{" "}
                {table.getPageCount().toLocaleString()}
              </strong>
            </span>
            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  table.setPageIndex(page);
                }}
                className="border p-1 rounded w-16"
              />
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
