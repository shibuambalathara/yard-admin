import React from "react";
import ViewFullProfile from "@/components/superAdmin/AccountVerificationRequest/viewFullProfile";
import { Suspense } from "react";
import Loading from "../../loading";

const ViewFullProfiles = ({ params }: { params: { profileId: string } }) => {
  return (
    <div className="h-full w-full">
      
      <Suspense fallback={<Loading />}>
        <ViewFullProfile profileId={params} />
      </Suspense>
    </div>
  );
};

export default ViewFullProfiles;
