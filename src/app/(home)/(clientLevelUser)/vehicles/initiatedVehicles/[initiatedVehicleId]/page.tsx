import React from 'react'
import IndividualReleaseStatus from "@/components/clientLevelUser/vehicles/initiatedVehicles/individualReleaseInitatedVehicles"
const IndividualInitiatedVehicle = ({params}:{params:{releaseId:string}}) => {
  return (
    <div><IndividualReleaseStatus releaseId={params}/></div>
  )
}

export default IndividualInitiatedVehicle