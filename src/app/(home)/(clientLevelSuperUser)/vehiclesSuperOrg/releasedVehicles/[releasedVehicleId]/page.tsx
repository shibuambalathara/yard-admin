import IndividualRelease from '@/components/clientLevelSuperUser/superVehicle/releasedVehicles/individualReleasedVehicles'
import React from 'react'
// import IndividualReleaseStatus from '@/components/clientLevelUser/vehicleRelease/releaseStatus/individualReleaseStatus'

const IndividualVehicleReleaseStatus = ({params}:{params:{releaseId:string}}) => {
  return (
    <div><IndividualRelease  releaseId={params}/></div>
  )
}

export default IndividualVehicleReleaseStatus