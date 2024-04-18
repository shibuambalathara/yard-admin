

import Header from "@/components/header/header";
import signup from "../(auth)/register/page";
import AddVehicleComponent from "./(yardManager)/vehicle/addvehicle/page";
import SideBar from "../../components/sidebar/sidebar";
import ReactTable from "./table/page";
import AddVehicle from "./(yardManager)/vehicle/addvehicle/page";
import Login from "../(auth)/login/page";
import { cookies } from 'next/headers'
import Link from "next/link";


export default function Home() {
 

  const cookieStore = cookies();
    const isAuthenticated = cookieStore.get('authToken')?.value;


   console.log("isAuthenticated from layout.jsx",isAuthenticated);
  
    // Implement your authentication check logic here
    // This could involve checking a cookie, token, or session data
   
  return (
    <div className="flex flex-col ">
     
    {/* //   <div className="flex flex-1">
    //     <SideBar />
    //     <div className="flex-1">
    //     <Login/>
        
    //     </div>
    //   </div> 
    //   <Sample/> */}

<Link href={'/table'}> REACT TABLE</Link>

<Link href={'/addvehicle'}> Add vehicle</Link>

    hiljasdflja;fdsf
     </div>
    
  );
}
