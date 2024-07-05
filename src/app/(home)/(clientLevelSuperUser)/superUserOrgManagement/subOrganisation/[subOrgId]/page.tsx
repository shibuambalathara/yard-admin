import React from 'react'
import EditSubOrganisation from "@/components/clientLevelSuperUser/superUserOrgManagement/clientLevelSubOrg/editSubOrganisation"
const EditSubOrg = ({params}:{params:{subOrgd:string}}) => {
  return (
    <div><EditSubOrganisation  subOrgId={params}/></div>
  )
}

export default EditSubOrg