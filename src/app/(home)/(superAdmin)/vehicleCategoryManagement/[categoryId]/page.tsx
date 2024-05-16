import React from 'react'
    import ViewVehicleCategory from '@/components/superAdmin/vehicleCategoryManagement/editCategory'

const IndividualVehicleCategory = ({params}:{params:{profileId:string}}) => {
  return (
    <div className='h-full w-full'><ViewVehicleCategory categoryId={params}/></div>
  )
}

export default IndividualVehicleCategory