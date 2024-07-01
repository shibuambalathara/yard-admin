import EditVehicleOwnership from '@/components/clientLevelSubUser/vehicleOwnership/viewVehicleOwnershipClient'
import React from 'react'


const ViewIndividualVehicleOwnership = ({params}:{params:{ownershipId:string}}) => {
  return (
    <div><EditVehicleOwnership ownershipId={params} /></div>
  )
}

export default ViewIndividualVehicleOwnership