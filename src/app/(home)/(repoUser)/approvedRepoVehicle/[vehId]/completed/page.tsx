
import CompleteRepo from '@/components/repoUser/approved/completeRepo'
import React from 'react'

const Page = ({params}:{params:{vehicleId:string}})  => {
  return (
    <div>
      <CompleteRepo vehicleId={params} />
    </div>
  )
}

export default Page