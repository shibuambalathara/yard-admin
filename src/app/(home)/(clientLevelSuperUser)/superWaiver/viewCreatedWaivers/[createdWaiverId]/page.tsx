import IndividualSuperWaiver from '@/components/clientLevelSuperUser/waiver/viewSuperRequestWaiver/individualSuperWaiver'
import React from 'react'

const IndividualSuper= ({params}:{params:{waiverId:string}}) => {
  return (
    <div><IndividualSuperWaiver waiverId={params}/></div>
  )
}

export default IndividualSuper