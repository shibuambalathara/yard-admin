import EditWaivers from '@/components/yardManager/waiver/editWaivers'
import React from 'react'


const ViewIndividualWaiver = ({params}:{params:{waiverVehicleId:string}}) => {
  return (
    <div><EditWaivers waiverVehicleId={params}/></div>
  )
}

export default ViewIndividualWaiver