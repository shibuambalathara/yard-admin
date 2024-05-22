import ViewUserFullProfile from '@/components/superAdmin/UserManagment/viewUserProfile'
import React from 'react'

const ViewUserProfile =({params}:{params:{profileId:string}}) => {
   
  return (
    <div className='w-full h-full'><ViewUserFullProfile profileId={params}/></div>
  )
}

export default ViewUserProfile