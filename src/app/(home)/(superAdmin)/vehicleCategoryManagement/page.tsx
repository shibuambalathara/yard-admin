
"use client";

import { useMemo } from 'react'

import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"
import { bidStatusOptions } from '@/utils/staticData';
import Link from 'next/link';

const VehicleCategoryManagement = () => {
    const movies = useMemo(() => data, [])

    const movieColumns = [
        {
          header: 'Name',
          accessorKey: 'id',
        },
        {
          header: 'Email ',
          accessorKey: 'name',
        },
        {
          header: 'Role ',
          accessorKey: 'genre',
        },
        {
          header: 'View Full Profile ',
          accessorKey: 'rating',
        },
      ]
  return (
    <div className='w-full p-2 '>
        <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>Manage Vehcile Category</h1>
        <div className=" w-36  flex flex-col text-center space-y-2  mx-4">
          <Link href="/vehicleCategoryManagement/addCategory" className="bg-gray-700 text-white px-4 py-1 ml-3 rounded-md "
>Add Category</Link>
          </div>
        <div>
        <DataTable data={movies} columns={movieColumns} />
        </div>
        
        </div>
  )
}

export default VehicleCategoryManagement
