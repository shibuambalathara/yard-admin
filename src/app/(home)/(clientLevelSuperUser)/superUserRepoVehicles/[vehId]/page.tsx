import ViewIndividualVehicle from '@/components/reuseableComponent/repoComponents/viewIndividualVehicle'
import React from 'react'

const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}})  => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
        <ViewIndividualVehicle vehicleId={params} user={'super'} />
        </div>
  )
}

export default IndividualRepoVehicle