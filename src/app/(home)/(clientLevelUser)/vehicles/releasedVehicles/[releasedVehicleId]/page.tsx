import IndividualReleaseInitiated from '@/components/clientLevelUser/vehicles/releasedVehicles/individualReleaseInitatedVehicles'
import React from 'react'
// import IndividualReleaseStatus from '@/components/clientLevelUser/vehicleRelease/releaseStatus/individualReleaseStatus'

const IndividualVehicleReleaseStatus = ({params}:{params:{releaseId:string}}) => {
  return (
    <div>
    <IndividualReleaseInitiated releaseId={params} />
      </div>
  )
}

export default IndividualVehicleReleaseStatus