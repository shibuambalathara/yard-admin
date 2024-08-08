import React from 'react'
import IndividualRequestedVehicle from "@/components/yardManager/repoRequestedVehicle/individualRepoRequestedVehicle"

const IndividualRepoRequests = ({params}:{params:{repoVehicleId:string}}) => {
  return (
    <div><IndividualRequestedVehicle repoVehicleId={params}/></div>
  )
}

export default IndividualRepoRequests