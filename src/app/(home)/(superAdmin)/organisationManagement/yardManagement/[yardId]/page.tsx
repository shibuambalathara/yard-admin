// to edit a individaul yard 

import React from 'react'
import EditIndividualYard from '@/components/superAdmin/organisationManagement/yardMangement/editIndividualYard'

const EditIndividualYards = ({ params }: { params: { yardId: string } })=> {
  return (
    <div className='w-full h-full'><EditIndividualYard/></div>
  )
}

export default EditIndividualYards