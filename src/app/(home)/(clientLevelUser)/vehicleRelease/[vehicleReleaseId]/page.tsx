import React from 'react'
import InitateIndividualVehcileRelease from '@/components/clientLevelUser/vehicleRelease/initateIndividualVehicle'

const InitateRelease = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div><InitateIndividualVehcileRelease ownershipId={params} /></div>
  )
}

export default InitateRelease