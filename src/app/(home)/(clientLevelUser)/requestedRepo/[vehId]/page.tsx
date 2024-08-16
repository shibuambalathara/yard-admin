
import ClientIndividualStatus from "@/components/reuseableComponent/repoComponents/clientRequest/individualRepoStatus";

import React from "react";




const ViewFullProfiles = ({ params }: { params: {vehicleId: string } }) => {
  return (
    <div className="h-full w-full">
      
    <ClientIndividualStatus user={'client'}  vehicleId={params} disable={true}  heading={'Requested Details'}/>
   
     
    </div>
  );
};

export default ViewFullProfiles;
