// import React, { useState, useEffect, useCallback } from 'react';
// import axiosInstance from '@/utils/axios';
// import {
//   getSortedRowModel,
//   ColumnDef,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   useReactTable,
// } from '@tanstack/react-table';
// import IndeterminateCheckbox from './IndeterminateCheckbox';
// import Pagination from '../pagination/pagination';
// import { PiSortAscendingLight, PiSortDescendingLight } from 'react-icons/pi';
// import { TbSelector } from 'react-icons/tb';
// import { CiSearch } from 'react-icons/ci';
// import toast from 'react-hot-toast';

// interface SelectTableProps {
//   client: string;
//   columns: ColumnDef<any>[];
//   dataEndpoint: string;
//   initialFilters?: { [key: string]: string };
//   pageSize?: number;
// }

// const SelectTable: React.FC<SelectTableProps> = ({
//   client,
//   columns,
//   dataEndpoint,
//   initialFilters = {},
//   pageSize = 5,
// }) => {
//   const [sorting, setSorting] = useState([]);
//   const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]);
//   const [globalFilter, setGlobalFilter] = useState('');
//   const [data, setData] = useState([]);
//   const [pageCount, setPageCount] = useState<number | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [pages, setPages] = useState(1);
//   const [filters, setFilters] = useState(initialFilters);

//   const fetchData = useCallback(async () => {
//     try {
//       if (pages <= 0) {
//         toast.error('Page must be a positive integer');
//         return;
//       }

//       const params = new URLSearchParams({
//         page: pages.toString(),
//         limit: pageSize.toString(),
//         cl_org_id: client,
//       });

//       Object.keys(filters).forEach((key) => {
//         if (filters[key]) {
//           params.append(key, filters[key]);
//         }
//       });

//       const response = await axiosInstance.get(`${dataEndpoint}?${params.toString()}`);
//       setData(response?.data?.res?.ownerships || []);
//       setPageCount(response?.data?.res?.totalCount || null);
//     } catch (error) {
//       toast.error('Error fetching data');
//       console.error('Error fetching data:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, [pages, filters, dataEndpoint, pageSize, client]);

//   useEffect(() => {
//     fetchData();
//   }, [pages, fetchData]);

//   const handleRowSelection = (id: string) => {
//     setSelectedRowIds((prev) => {
//       if (prev.includes(id)) {
//         return prev.filter((ids) => ids !== id);
//       } else {
//         return [...prev, id];
//       }
//     });
//   };

//   const table = useReactTable({
//     data,
//     columns,
//     state: {
//       sorting: sorting,
//       globalFilter: globalFilter,
//     },
//     getSortedRowModel: getSortedRowModel(),
//     getCoreRowModel: getCoreRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     onSortingChange: setSorting,
//     onGlobalFilterChange: setGlobalFilter,
//   });

//   const handleFilterChange = (key, value) => {
//     setFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <div className="w-full">
//       <div className="mb-4">
//         <div className="flex space-x-4">
//           {Object.keys(initialFilters).map((filterKey) => (
//             <div key={filterKey} className="flex flex-col">
//               <label htmlFor={filterKey} className="mb-1">
//                 {filterKey}
//               </label>
//               <input
//                 id={filterKey}
//                 type="text"
//                 value={filters[filterKey]}
//                 onChange={(e) => handleFilterChange(filterKey, e.target.value)}
//                 className="border p-2 rounded"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//       {loading ? (
//         <div className="flex w-full h-screen items-center justify-center">Loading...</div>
//       ) : (
//         <div className="w-full p-5">
//           <div className="mt-0.5">
//             <div className="relative rounded-md shadow-sm max-w-sm">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <CiSearch className="h-5 w-5 text-gray-800" aria-hidden="true" />
//               </div>
//               <input
//                 type="text"
//                 value={globalFilter}
//                 onChange={(e) => setGlobalFilter(e.target.value)}
//                 placeholder="search"
//                 className="border w-44 focus:ring-indigo-500 focus:outline-none block m-2 pl-10 rounded-md border-gray-400 p-1 placeholder:font-semibold"
//               />
//             </div>
//           </div>
//           <div className="mt-2 ring-1 w-full h-fit ring-gray-300 rounded-lg overflow-auto">
//             <table className="min-w-full divide-y divide-gray-300 relative">
//               <thead className="bg-gray-700 rounded-lg">
//                 {table.getHeaderGroups().map((headerGroup) => (
//                   <tr key={headerGroup.id} className="divide-x divide-gray-500">
//                     {headerGroup.headers.map((header) => (
//                       <th key={header.id} colSpan={header.colSpan} className="py-3.5 uppercase pl-1 pr-1 text-sm font-semibold text-gray-100 text-left sm:pl-2">
//                         {header.isPlaceholder ? null : (
//                           <div className="flex items-center">
//                             {flexRender(header?.column?.columnDef?.header, header.getContext())}
//                             <div className="flex justify-center items-center pl-2">
//                               {sorting.find((sort) => sort.id === header.id) ? (
//                                 sorting.find((sort) => sort.id === header.id).desc ? (
//                                   <PiSortDescendingLight />
//                                 ) : (
//                                   <PiSortAscendingLight />
//                                 )
//                               ) : (
//                                 <TbSelector />
//                               )}
//                             </div>
//                           </div>
//                         )}
//                       </th>
//                     ))}
//                   </tr>
//                 ))}
//               </thead>
//               <tbody className="text-black space-x-8">
//                 {table.getRowModel().rows.map((row) => (
//                   <tr key={row.id} className="divide-x divide-gray-300 cursor-pointer hover:bg-indigo-50">
//                     {row.getVisibleCells().map((cell) => (
//                       <td key={cell.id} className="px-6 py-3.5 text-sm text-gray-800 border-t max-sm:font-bold border-gray-200">
//                         {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//           <div className="w-full text-center">
//             {pageCount && (
//               <Pagination
//                 page={pages}
//                 setPage={setPages}
//                 totalDataCount={pageCount}
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SelectTable;
