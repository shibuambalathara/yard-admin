import React from 'react'
import IndividualRepoVehicles from "@/components/yardManager/repoRequests/individualRepoRequests"

const IndividualRepoVehicle = ({params}:{params:{yardId:string}}) => {
  return (
    <div><IndividualRepoVehicles yardId={params} /></div>
  )
}

export default IndividualRepoVehicle