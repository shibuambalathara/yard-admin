// import React from 'react'
// import InitiateInstockVehicles from "@/components/clientLevelUser/vehicles/instockVehicles/InitiateInstockVehicle"

// const InitiateIndividualInstockVehicle = ({params}:{params:{instockVehicle:string}}) => {
//   return (
//     <div><InitiateInstockVehicles instockVehicle={params}/></div>
//   )
// }

// export default InitiateIndividualInstockVehicle

import InitiateInstockVehicle from "@/components/clientLevelUser/vehicles/instockVehicles/initiateInstockVehicle"

const InitiateIndividualInstockVehicle = ({params}:{params:{instockVehicle:string}})=> {
  return (
    <div><InitiateInstockVehicle instockVehicle={params}/></div>
  )
}

export default InitiateIndividualInstockVehicle