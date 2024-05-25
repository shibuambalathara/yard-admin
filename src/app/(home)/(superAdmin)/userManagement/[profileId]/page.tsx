import ViewUserFullProfile from '@/components/superAdmin/UserManagment/ViewUserProfile'
import React from 'react'

const ViewIndividualUser =({params}:{params:{profileId:string}}) => {
   
  return (
    <div className='w-full h-full'><ViewUserFullProfile profileId={params}/></div>
  )
}

export default ViewIndividualUser