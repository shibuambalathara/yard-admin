import React from 'react'
import AllApprovedRepoVehicles from '@/components/repoUser/approved/approvedRepoVehicle'
import AllResponse from '@/components/reuseableComponent/repoComponents/clientRequest/rejectAndApproved'

const ApprovedRepoVehicles = () => {
  return (
    <div><AllResponse  user={'super'} childrenRequire={false} response={"REPOSSESSION_APPROVED"}/></div>
  )
}

export default ApprovedRepoVehicles