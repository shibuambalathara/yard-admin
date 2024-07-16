import React from 'react'
import IndividualVehicle from "../../reuseableComponent/repoComponents/viewIndividualVehicle"

const IndividualRepoVehicle = () => {
    const vehicleId="123"
  return (
    <div><IndividualVehicle vehicleId={vehicleId} /></div>
  )
}

export default IndividualRepoVehicle