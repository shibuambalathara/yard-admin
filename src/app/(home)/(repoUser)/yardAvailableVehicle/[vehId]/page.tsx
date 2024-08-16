import React from 'react'
import IndividualVehicle from "@/components/repoUser/repoUserVehicles/individualRepoVehicle"

const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
        <IndividualVehicle vehicleId={params} />
        </div>
  )
}

export default IndividualRepoVehicle