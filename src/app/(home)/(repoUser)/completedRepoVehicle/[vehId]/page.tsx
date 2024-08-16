import IndividualCompleted from '@/components/repoUser/completed/individualCompleted'
import IndividualStatuss from '@/components/reuseableComponent/repoComponents/individualRepoStatus'
import React from 'react'


const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
       <IndividualCompleted vehicleId={params}  />
        </div>
  )
}

export default IndividualRepoVehicle