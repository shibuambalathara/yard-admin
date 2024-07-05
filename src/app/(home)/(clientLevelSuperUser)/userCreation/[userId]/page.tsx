import React from 'react'
import EditIndividualUser from '@/components/clientLevelSuperUser/userManagement/editUser'

const individualUserView = ({params}:{params:{userId:string}}) => {
  return (
    <div><EditIndividualUser userId={params}/></div>
  )
}

export default individualUserView