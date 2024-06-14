import IndividualCreatedWaiver from '@/components/clientLevelUser/waiver/viewRequestedWaivers/individualCreatedWaiver'
import React from 'react'

const individualCreatedWaiver = ({params}:{params:{waiverId:string}}) => {
  return (
    <div>
      <IndividualCreatedWaiver waiverId={params} />
      </div>
  )
}

export default individualCreatedWaiver