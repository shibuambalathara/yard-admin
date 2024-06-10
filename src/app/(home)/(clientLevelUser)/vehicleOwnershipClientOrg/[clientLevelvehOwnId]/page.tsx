import React from 'react'
import ViewVehicleOwnershipClient from "@/components/clientLevelUser/viewVehicleOwnershipClient"
const ViewIndividualVehicleOwnership = ({params}:{params:{ownershipId:string}}) => {
  return (
    <div><ViewVehicleOwnershipClient ownershipId={params} /></div>
  )
}

export default ViewIndividualVehicleOwnership