import React from 'react';
import { TbCarOff } from "react-icons/tb";

const NoVehicleMessage = (props) => {
  const { roleFilter, statusFilter, typeFilter ,catFilter,
  yardFilter, clientFilter} = props;

  console.log(yardFilter);


 

  return (
    <div className="flex flex-col justify-center items-center h-96 p-8">
      <div className="mb-6">
        <TbCarOff className='text-red-500 font-bold text-6xl' />
      </div>
      <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
        
          <>

          <span>No {typeFilter}  Found</span>
          { clientFilter && (
              <> for Client <span className='font-bold'>{ clientFilter}</span></>
            )}  
         
            {catFilter && (
              <> for Category <span className='font-bold'>{catFilter}</span></>
            )}
            {yardFilter && (
              <> In  <span className='font-bold'>{yardFilter}</span></>
            )}
            {statusFilter && (
              <> with status <span className='font-bold'>{statusFilter}</span></>
            )}
          </>
        
      </p>
      <p className="text-gray-500 text-md mt-4"> There is no vehicles  try adjusting the filters </p>
    </div>
  );
};

export default NoVehicleMessage;
