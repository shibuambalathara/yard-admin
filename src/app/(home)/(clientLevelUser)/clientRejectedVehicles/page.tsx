import React from 'react'
import AllRejectedVehicles from '@/components/repoUser/rejected/RejectedRepoVehicle'
import AllResponse from '@/components/reuseableComponent/repoComponents/clientRequest/rejectAndApproved'

const RejectedRepoVehicles = () => {
  return (
    <AllResponse  user={'client'} childrenRequire={false} response={"REPOSSESSION_REJECTED"}/>
  )
}

export default RejectedRepoVehicles