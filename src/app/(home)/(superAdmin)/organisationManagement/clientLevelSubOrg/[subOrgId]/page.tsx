import React from 'react'
import ViewIndividualClientLevelSubOrg from "@/components/superAdmin/organisationManagement/clientLevelSubOrg/viewClientLevelSubOrg"

const individualClientLevelSubOrg = ({ params }: { params: { subOrgId: string } }) => {
  return (
    <div><ViewIndividualClientLevelSubOrg subOrgId={params}  /></div>
  )
}

export default individualClientLevelSubOrg