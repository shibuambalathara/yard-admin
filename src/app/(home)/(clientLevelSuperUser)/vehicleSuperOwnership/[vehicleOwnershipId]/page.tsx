import ViewVehicleOwnership from '@/components/clientLevelSuperUser/vehicleOwnership/viewVehicleOwnership'
import React from 'react'

const IndividualOwnership = ({params}:{params:{ownershipId:string}}) => {
  return (
    <div><ViewVehicleOwnership ownershipId={params}/></div>
  )
}

export default IndividualOwnership