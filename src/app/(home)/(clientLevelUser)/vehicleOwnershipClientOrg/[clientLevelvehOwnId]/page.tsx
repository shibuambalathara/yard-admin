import React from 'react'

import EditVehicleOwnership from '@/components/clientLevelUser/vehicleOwnership/viewVehicleOwnershipClient'
const ViewIndividualVehicleOwnership = ({params}:{params:{ownershipId:string}}) => {
  return (
    <div><EditVehicleOwnership ownershipId={params} /></div>
  )
}

export default ViewIndividualVehicleOwnership