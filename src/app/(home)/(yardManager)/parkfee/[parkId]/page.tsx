import React from 'react'
import EditParkFeeIndividual from '@/components/yardManager/parkFee/editParkFee'

const EditIndividualParkFee = ({params}:{params:{parkId:string}})=> {
  return (
    <div className='h-full w-full'><EditParkFeeIndividual parkId={params}/></div>
  )
}

export default EditIndividualParkFee