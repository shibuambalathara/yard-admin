import IndividualStatuss from "@/components/reuseableComponent/repoComponents/individualRepoStatus";

import React from "react";




const ViewFullProfiles = ({ params }: { params: {vehicleId: string } }) => {
  return (
    <div className="h-full w-full">
      
    <IndividualStatuss user={'client'}  vehicleId={params} disable={true}/>
   
     
    </div>
  );
};

export default ViewFullProfiles;
