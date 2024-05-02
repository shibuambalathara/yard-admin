import React from 'react'
import ViewFullProfile from '@/components/superAdmin/AccountVerificationRequest/viewFullProfile'

const ViewFullProfiles = ({params}:{params:{profileId:string}}) => {
  return (
    <div className='h-full w-full'><ViewFullProfile profileId={params}/></div>
  )
}

export default ViewFullProfiles