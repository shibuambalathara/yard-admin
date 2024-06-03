import React from 'react'
import ViewIndividualClientLevelOrganisation from "@/components/superAdmin/organisationManagement/clientLevelOrg/viewClientLevelOrg"

const ViewIndividualClientLevelOrg = ({ params }: { params: { clientOrgId: string } }) => {
  return (
    <div className='w-full h-full'><ViewIndividualClientLevelOrganisation  clientOrgId={params}/></div>
  )
}

export default ViewIndividualClientLevelOrg