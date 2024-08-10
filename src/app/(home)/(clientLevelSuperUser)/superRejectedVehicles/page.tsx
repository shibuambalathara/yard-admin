import React from 'react'
import AllRejectedVehicles from '@/components/repoUser/rejected/RejectedRepoVehicle'
import AllResponse from '@/components/reuseableComponent/repoComponents/clientRequest/rejectAndApproved'

const RejectedRepoVehicles = () => {
  return (
    <div><AllResponse  user={'super'} childrenRequire={false} response={"REPOSSESSION_REJECTED"}/></div>
  )
}

export default RejectedRepoVehicles