import CancelledVehicle from '@/components/clientLevelUser/vehicles/cancelledVehicles/individualCancelledVehicles'
import React from 'react'


const InidvidualCancelledVehicles = ({params}:{params:{cancelledId:string}}) => {
  return (
    <div><CancelledVehicle cancelledId={params}/></div>
  )
}

export default InidvidualCancelledVehicles