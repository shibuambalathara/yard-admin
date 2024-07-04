import React from "react";
import ViewVehicleCategory from "@/components/superAdmin/vehicleCategoryManagement/editCategory";
import { Suspense } from "react";

const IndividualVehicleCategory = ({
  params,
}: {
  params: { profileId: string };
}) => {
  return (
    <div className="h-full w-full">
      {/* <Suspense fallback={<p>loading...</p>}> */}
      {/* <ViewVehicleCategory categoryId={params} /> */}
      gdfsg
      {/* </Suspense> */}
     
    </div>
  );
};

export default IndividualVehicleCategory;
