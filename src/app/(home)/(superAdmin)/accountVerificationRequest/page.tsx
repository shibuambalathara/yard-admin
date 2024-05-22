import React from 'react'
import { Suspense } from 'react'
import AccountVerificationRequests from "@/components/superAdmin/AccountVerificationRequest/allAccounts"
import Loading from "../loading"

const Accounts = () => {
  return (
    <div className='h-full w-full'>
       {/* <Suspense>  */}
         <AccountVerificationRequests/>  
           {/* </Suspense> */}
          
   
      </div>
  )
}

export default Accounts