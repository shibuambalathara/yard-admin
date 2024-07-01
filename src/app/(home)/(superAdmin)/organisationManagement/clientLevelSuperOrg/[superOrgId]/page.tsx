import React from 'react'
import ViewClientLevelSuperOrganisation from "@/components/superAdmin/organisationManagement/clientLevelSuperOrg/viewClientLevelSuperOrg"

const ViewIndividualOrg = ({ params }: { params: { profileId: string } }) => {
  return (
    <div className='h-full w-full'><ViewClientLevelSuperOrganisation  profileId={params}/></div>
  )
}

export default ViewIndividualOrg