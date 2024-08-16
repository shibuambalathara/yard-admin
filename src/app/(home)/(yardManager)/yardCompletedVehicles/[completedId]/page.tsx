import React from 'react'
import IndividualCompletedVehicle from "@/components/yardManager/yardCompletedVehicles/individualEntryCompletedVehicle"


const IndividualEntryCompleted = ({params}:{params:{vehicleId:string}})=> {
  return (
    <div><IndividualCompletedVehicle vehicleId={params}/></div>
  )
}

export default IndividualEntryCompleted