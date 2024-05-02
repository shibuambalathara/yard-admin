"use client";

import { useMemo } from 'react'

import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"
import { bidStatusOptions } from '@/utils/staticData';
import Link from 'next/link';

const UserManagement = () => {
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
          header: 'contact ',
          accessorKey: 'genre',
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
    <div className='w-full  '>
        <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>User Management</h1>
        <div className='flex w-full px-8 justify-between  '>
        <div className=" w-36  flex flex-col text-center space-y-2  mx-4">
          <label htmlFor="bid-status " className="font-roboto font-semibold text-lg">Select Role</label>
          <select id="bid-status"  className="px-2 py-1 border-2">
          <option disabled value="">select a client</option>

            {/* Render each option based on bidStatusOptions data */}
            {bidStatusOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          </div>
          <div>
            <button></button>
          </div>
         <div className='self-end'>
         <Link href="/userManagement/createUser" className="bg-gray-700 text-white px-4 py-1 ml-3 rounded-md "
>Create User</Link>
         </div>
        </div>
        <div>
        <DataTable data={movies} columns={movieColumns} />
        </div>
        
        </div>
  )
}

export default UserManagement
