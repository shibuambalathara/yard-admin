

import Header from "@/components/header/header";
import signup from "../(auth)/register/page";
import AddVehicleComponent from "./(yardManager)/vehicle/addvehicle/page";
import SideBar from "../../components/sidebar/sidebar";
import ReactTable from "./table/page";
import AddVehicle from "./(yardManager)/vehicle/addvehicle/page";
import Login from "../(auth)/login/page";
import { cookies } from 'next/headers'
import Link from "next/link";
import React from 'react';

const Home = () => {
  return (
    <div className="p-6 bg-gradient-to-r  to-blue-500 min-h-screen uppercase flex justify-center items-center">
      Welcome to ADMIN DASHBOARD
    </div>
  );
};

export default Home;

