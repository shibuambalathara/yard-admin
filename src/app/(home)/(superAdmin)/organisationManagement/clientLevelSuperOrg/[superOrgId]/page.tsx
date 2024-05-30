import React from 'react'
import ViewClientLevelSuperOrganisation from "@/components/superAdmin/organisationManagement/clientLevelSuperOrg/viewClientLevelSuperOrg"

const ViewIndividualOrg = ({ params }: { params: { profileId: string } }) => {
  return (
    <div><ViewClientLevelSuperOrganisation  profileId={params}/></div>
  )
}

export default ViewIndividualOrg