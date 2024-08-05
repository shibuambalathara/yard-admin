import React from 'react'
import IndividualYardVehicle from "@/components/repoUser/yardRequestedVehicles/individualRequestedVehicle"

const IndividualYardRequested = ({ params }: { params: { vehicleId: string } }) => {
  return (
    <div><IndividualYardVehicle yardVehId={params}/></div>
  )
}

export default IndividualYardRequested