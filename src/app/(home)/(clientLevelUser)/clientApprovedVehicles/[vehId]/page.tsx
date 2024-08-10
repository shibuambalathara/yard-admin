
import IndividualStatuss from '@/components/reuseableComponent/repoComponents/clientAndSuper/responseIndividual'
import React from 'react'


const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}}) => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
       <IndividualStatuss vehicleId={params} user={'approved'}/>
        </div>
  )
}

export default IndividualRepoVehicle