"use client";

import { useMemo } from 'react'

import data from "../../../components/tables/mockData.json"
import DataTable from "../../../components/tables/dataTable"

const ReactTable = () => {
    const movies = useMemo(() => data, [])

    const movieColumns = [
        {
          header: 'ID',
          accessorKey: 'id',
        },
        {
          header: 'Name',
          accessorKey: 'name',
        },
        {
          header: 'Genre',
          accessorKey: 'genre',
        },
        {
          header: 'Rating',
          accessorKey: 'rating',
        },
      ]
  return (
    <div className='w-full'><DataTable data={movies} columns={movieColumns} /></div>
  )
}

export default ReactTable