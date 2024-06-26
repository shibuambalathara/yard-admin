
import IndividualCancelledVehicle from '@/components/clientLevelSuperUser/superVehicle/cancelledVehicles/individualCancelledVehicles'
import React from 'react'


const InidvidualCancelledVehicles = ({params}:{params:{cancelledId:string}}) => {
  return (
    <div><IndividualCancelledVehicle cancelledId={params}/></div>
  )
}

export default InidvidualCancelledVehicles