import IndividualReleaseInitiated from '@/components/clientLevelSuperUser/superVehicle/initiatedVehicles/individualReleaseInitatedVehicles'
import React from 'react'

const IndividualInitiatedVehicle = ({params}:{params:{releaseId:string}}) => {
  return (
    <div><IndividualReleaseInitiated releaseId={params}/></div>
  )
}

export default IndividualInitiatedVehicle