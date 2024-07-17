import React from 'react'
import IndividualVehicle from "../../reuseableComponent/repoComponents/viewIndividualVehicle"

const IndividualRepoVehicle = () => {
    const vehicleId="123"

    console.log("963",vehicleId);
    
  return (
    <div>
      {/* <p>fghfgfdgsdfgg</p> */}
      <IndividualVehicle vehicleId={vehicleId} />
      </div>
  )
}

export default IndividualRepoVehicle