import RepoRequest from '@/components/repoUser/repoUserVehicles/requestRepo'
import React from 'react'

const Page = ({params}:{params:{vehicleId:string}})  => {
  return (
    <div>
      <RepoRequest vehicleId={params} />
    </div>
  )
}

export default Page