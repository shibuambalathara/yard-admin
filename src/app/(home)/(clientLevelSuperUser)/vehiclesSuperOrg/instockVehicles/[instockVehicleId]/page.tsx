// import React from 'react'
// import InitiateInstockVehicles from "@/components/clientLevelUser/vehicles/instockVehicles/InitiateInstockVehicle"

import InitiateInstockVehicle from "@/components/clientLevelSuperUser/superVehicle/instockVehicles/initiateInstockVehicle"

// const InitiateIndividualInstockVehicle = ({params}:{params:{instockVehicle:string}}) => {
//   return (
//     <div><InitiateInstockVehicles instockVehicle={params}/></div>
//   )
// }

// export default InitiateIndividualInstockVehicle



const InitiateIndividualInstockVehicle = ({params}:{params:{instockVehicle:string}})=> {
  return (
    <div><InitiateInstockVehicle instockVehicle={params}/></div>
  )
}

export default InitiateIndividualInstockVehicle