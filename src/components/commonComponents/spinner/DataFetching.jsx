import React from 'react'
import  { BarLoader } from 'react-spinners'

const Spinner = () => {
  return (
   <>
   
 <div className='space-x-4 flex justify-between items-center w-40 h-96 '>
      <strong className='uppercase'>uploading...</strong>
      <div
        className="ml-auto inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"></div>
    </div>
   </>
  )
}

export default Spinner