import ViewIndividualVehicle from "@/components/reuseableComponent/repoComponents/viewIndividualVehicle";
import React from "react";




const ViewFullProfiles = ({ params }: { params: {repoId: string } }) => {
  return (
    <div className="h-full w-full">
      
    <ViewIndividualVehicle   vehicleId={params}/>
   
     
    </div>
  );
};

export default ViewFullProfiles;
