import IndividualStatuss from '@/components/reuseableComponent/repoComponents/individualRepoStatus'
import React from 'react'


const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
       <IndividualStatuss vehicleId={params} />
        </div>
  )
}

export default IndividualRepoVehicle