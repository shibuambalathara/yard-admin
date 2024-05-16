import React from 'react'
import ViewClientCategory from '@/components/clientCategoryManagement/ViewClientCategory'

const IndividualClient = ({params}:{params:{clientId:string}}) => {
  return (
    <div className='h-full w-full'><ViewClientCategory clientId={params}/></div>
  )
}

export default IndividualClient