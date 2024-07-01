import React from 'react'
import EditIndividualVehicle from '@/components/yardManager/vehicles/editVehicles'

const EditVehicle = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div><EditIndividualVehicle vehicleId={params}/></div>
  )
}

export default EditVehicle