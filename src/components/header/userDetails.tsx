import React from 'react'
import { FaChevronDown ,FaUserCircle} from "react-icons/fa";
import { FiLogOut } from 'react-icons/fi';
const UserDetails = () => {
  return (
    <div  className="flex border-2 space-x-2 rounded-lg">
      <FaUserCircle  size="2em"/> 
    <div className="dropdown dropdown-end">
    
      <button tabIndex={0} className=" flex flex-col avatar">
        <p className="text-xs font-bold flex  ">User Name <span className='pl-2 pt-1'><FaChevronDown /></span></p> 
        <p className="text-xs">Role</p>
      </button>
      <ul
        tabIndex={0}
        className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
      >
        <>
       
        

          <li>
            <button className=" font-bold  ">
              Logout <span><FiLogOut /></span>
            </button>
          </li>
        </>
      </ul>
    </div>
  </div>
  )
}

export default UserDetails