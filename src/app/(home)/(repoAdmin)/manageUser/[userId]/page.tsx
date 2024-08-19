import React from 'react'
import IndividualUser from "@/components/repoAdmin/manageUser/editUser"

const EditIndividualUser = ({params}:{params:{userOrgId:string}}) => {
  return (
    <div><IndividualUser userOrgId={params}/></div>
  )
}

export default EditIndividualUser