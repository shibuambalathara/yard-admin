import React from 'react'
import ReleasedVehicle from "@/components/yardManager/vehicleRelease/releasedVehicles/individualReleasedVehicle"
const IndividualReleasedVehicle = ({params}:{params:{releasedId:string}}) => {
  return (
    <div><ReleasedVehicle  releasedId={params}/></div>
  )
}

export default IndividualReleasedVehicle