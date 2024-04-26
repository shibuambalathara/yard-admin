"use client";

import { useMemo } from 'react'

import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"
import { bidStatusOptions } from '@/utils/staticData';

const AccountVerificationRequest = () => {
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
    <div className='w-full  '>
        <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>Account Verification Request</h1>
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
        <DataTable data={movies} columns={movieColumns} />
        </div>
        
        </div>
  )
}

export default AccountVerificationRequest
