import Loading from "../loading";
import VehicleCategoryManagements from "@/components/superAdmin/vehicleCategoryManagement/allCategory";
import { Suspense } from "react";
const VehicleCategoryManagement = () => {
  return (
    <div className="w-full h-full ">
      {/* <Suspense fallback={<Loading/>}> */}

      <VehicleCategoryManagements />
      {/* </Suspense> */}
     
    </div>
  );
};

export default VehicleCategoryManagement;
