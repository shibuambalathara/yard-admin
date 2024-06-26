import React from 'react';
import { TbSpyOff } from "react-icons/tb";

const NoVehicleMessage = (props) => {
  const { roleFilter, statusFilter, typeFilter ,categoryFilter,
  yardFilter} = props;
  console.log(roleFilter);
  const getRoleMessage = () => {
    if (!roleFilter) {
      return 'Please select a client to view the data';
    }
    
    
    return roleFilter;
  };

  return (
    <div className="flex flex-col justify-center items-center h-96 p-8">
      <div className="mb-6">
        <TbSpyOff className='text-red-500 font-bold text-6xl' />
      </div>
      <p className="text-gray-700 text-md font-semibold mb-2 uppercase">
        {roleFilter ? (
          <>
            No {typeFilter} for <span className='font-bold'>{roleFilter}</span>
            {statusFilter && (
              <> with status <span className='font-bold'>{statusFilter}</span></>
            )}
            {categoryFilter && (
              <> with Category <span className='font-bold'>{categoryFilter}</span></>
            )}
            {yardFilter && (
              <> In yard <span className='font-bold'>{yardFilter}</span></>
            )}
          </>
        ) : (
          getRoleMessage()
        )}
      </p>
      <p className="text-gray-500 text-md mt-4">Try adjusting your filters or change client.</p>
    </div>
  );
};

export default NoVehicleMessage;
