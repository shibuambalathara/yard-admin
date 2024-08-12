import IndividualStatuss from '@/components/reuseableComponent/repoComponents/clientRequest/individualRepoStatus'

import React from 'react'

const IndividualRepoVehicle = ({params}:{params:{vehicleId:string}})  => {
  return (
    <div>
        {/* <p>safasfjasdlfadslf</p> */}
        <IndividualStatuss vehicleId={params} user={'super'} heading={'captured Details'} />
        </div>
  )
}

export default IndividualRepoVehicle