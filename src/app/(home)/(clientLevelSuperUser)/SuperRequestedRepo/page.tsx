
import AllRequestedVehicles from '@/components/reuseableComponent/repoComponents/clientRequest/RequestedRepoVehicles'
import React from 'react'

const AllRequestedRepo = () => {
  return (
    <div><AllRequestedVehicles childrenRequire={true} user ={'super'}/></div>
  )
}

export default AllRequestedRepo