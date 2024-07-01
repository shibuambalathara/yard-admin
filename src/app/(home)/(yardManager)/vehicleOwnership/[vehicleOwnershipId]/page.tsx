import React from 'react'
import EditVehicleOwnership from "@/components/yardManager/vehicleOwnershipRequest/editVehicleOwnership"

const EditIndividualVehicleOwnership = ({params}:{params:{ownershipId:string}}) => {
  return (
    <div><EditVehicleOwnership ownershipId={params}/></div>
  )
}

export default EditIndividualVehicleOwnership