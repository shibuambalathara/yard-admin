"use client";
import React from 'react'


import { useMemo } from "react";

import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { SelectInput } from "@/components/ui/fromFields";
import { bidStatusOptions } from "../../../../../utils/staticData";

const InitiateRelease = () => {
  const movies = useMemo(() => data, []);

  const movieColumns = [
    {
      header: "Vehicle Name",
      accessorKey: "id",
    },
    {
      header: "Client User Name ",
      accessorKey: "name",
    },
    {
      header: "Waiver post park fee   ",
      accessorKey: "genre",
    },
    {
      header: "Entry date  ",
      accessorKey: "rating",
    },
    {
      header: "No. of days in yard ",
      accessorKey: "rating",
    },
    {
      header: "Release ",
      accessorKey: "rating",
    },
  ];
  return (
    <div className=" ">
      <div className=" ">
        <h1 className="text-center font-roboto text-lg font-bold mt-5  uppercase">
     INITIATE VEHICLE RELEASE
        </h1>
        <div className=" px-10 mt-2">
        <div className=" w-36  flex flex-col text-center space-y-2">
          <label htmlFor="bid-status " className="font-roboto font-semibold text-lg">Select a Client</label>
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

          {/* Display the currently selected option */}

          <DataTable data={movies} columns={movieColumns} />
        </div>
      </div>
    </div>
  );
};

export default InitiateRelease;
