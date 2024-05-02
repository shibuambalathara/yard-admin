

"use client";

import { useMemo } from "react";

import data from "@/components/tables/mockData.json";
import DataTable from "@/components/tables/dataTable";
import { SelectInput } from "@/components/ui/fromFields";
import { bidStatusOptions } from "../../../../../utils/staticData";

const WavierReviewRequest = () => {
  const movies = useMemo(() => data, []);

  const movieColumns = [
    {
      header: "Waiver code",
      accessorKey: "id",
    },
    {
      header: "Waiver Status ",
      accessorKey: "name",
    },
    {
      header: "Requested By  ",
      accessorKey: "genre",
    },
    {
      header: "Waiver park fee ",
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
          

          {/* Display the currently selected option */}

          <DataTable data={movies} columns={movieColumns} />
        </div>
      </div>
    </div>
  );
};

export default WavierReviewRequest;
