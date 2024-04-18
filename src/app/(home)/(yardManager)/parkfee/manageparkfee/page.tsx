"use client";

import { useMemo } from 'react'

import data from "@/components/tables/mockData.json"
import DataTable from "@/components/tables/dataTable"

const ManageParkFee = () => {
    const movies = useMemo(() => data, [])

    const movieColumns = [
        {
          header: 'Vehicle   Category  Name',
          accessorKey: 'id',
        },
        {
          header: 'Client Name ',
          accessorKey: 'name',
        },
        {
          header: 'Park fee  per day  ',
          accessorKey: 'genre',
        },
        {
          header: 'Edit ',
          accessorKey: 'rating',
        },
      ]
  return (
    <div className='w-full  '>
        <h1 className='text-center font-roboto text-lg font-bold py-4 uppercase'>Manage Park Fee</h1>
        <DataTable data={movies} columns={movieColumns} />
        
        </div>
  )
}

export default ManageParkFee