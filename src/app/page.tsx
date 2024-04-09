"use client";

import Header from "@/components/header/header";
import UserSignup from "../app/signup/page";
import AddVehicleComponent from "../app/addvehicle/page";
import SideBar from "../components/sidebar/sidebar";
import ReactTable from "./table/page";
import Login from "./login/page";
import AddVehicle from "../app/addvehicle/page";

export default function Home() {
 

  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
      <div className="flex flex-1">
        <SideBar />
        <div className="flex-1">
        <ReactTable/>
        </div>
      </div>
    </div>
  );
}
