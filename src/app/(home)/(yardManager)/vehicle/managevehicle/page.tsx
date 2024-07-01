"use client";

import { useMemo } from "react";

import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
// import { SelectInput } from "@/components/ui/fromFields";
import { AccountStatus } from "../../../../../utils/staticData";

const ManageVehicle = () => {
  const movies = useMemo(() => data, []);

  const movieColumns = [
    {
      header: "Vehicle   Category  Name",
      accessorKey: "id",
    },
    {
      header: "Client Name ",
      accessorKey: "name",
    },
    {
      header: "Park fee  per day  ",
      accessorKey: "genre",
    },
    {
      header: "Edit ",
      accessorKey: "rating",
    },
  ];
  return (
    <div className=" ">
      <div className=" ">
        <h1 className="text-center font-roboto text-lg font-bold mt-5  uppercase">
          Manage Park Fee
        </h1>
        <div className=" px-10">
          <div className=" w-36  flex flex-col text-center">
          <label htmlFor="bid-status">Select a Client</label>
          <select id="bid-status" >
          <option disabled value="">select a client</option>

            {/* Render each option based on bidStatusOptions data */}
            {AccountStatus.map((option, index) => (
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

export default ManageVehicle;
