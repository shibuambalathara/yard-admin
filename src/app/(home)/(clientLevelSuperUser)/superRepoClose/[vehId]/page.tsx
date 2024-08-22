

import IndividualStatuss from '@/components/reuseableComponent/repoComponents/repoClose/individualRepoClose'
import React from 'react'

const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}})  => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
        <IndividualStatuss vehicleId={params} user={'super'} heading={'captured Vehicle Details'} />
        </div>
  )
}

export default IndividualRepoVehicle