

"use client";

import React, { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../../../utils/axios"; // Replace with your axios instance path
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { inputStyle } from "@/components/ui/style";
import Spinner from "@/components/commonComponents/spinner/spinner";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import  ConfirmationModal from "@/components/modals/releaseModal/releaseModal"
import { InputField,SelectComponent } from "@/components/ui/fromFields";
import { useForm } from "react-hook-form";
import {paymentStatus} from "@/utils/staticData"
import { YardDetails, VehicleDetails, VehicleOwnerships, ReleaseDetails } from "@/components/commonComponents/detailTabs/detailTabs";


type CLOrg = {
  code: string;
  cl_org_name: string;
};

type VehicleCategory = {
  name: string;
};

type Yard = {
  code: string;
  yard_name: string;
};
interface ReleaseDetails {
  collected_amount: number | null;
  created_at: string;
  created_by_ins_id: string;
  created_by_ins_type: string;
  created_by_user_id: string;
  days_in_yard: number;
  id: string;
  is_deleted: boolean;
  payment_doc: string | null;
  payment_status: string;
  receiver_contact: string;
  receiver_name: string;
  release_date: string;
  release_doc: string | null;
  total_amount: number;
  total_park_fee: number;
  total_waiver_park_fee: number | null;
  updated_at: string;
  updated_by_ins_id: string;
  updated_by_ins_type: string;
  updated_by_user_id: string;
  vehicle_release_id: string;
  status: string;
  status_changed_at: string;
}

type Vehicle = {
  actual_entry_date: string;
  code: string;
  make: string;
  model: string;
  park_fee_per_day: number;
  reg_number: string;
  vehicle_category: VehicleCategory;
  yard: Yard;
  vehicle_img: string[]; // Assuming these are strings representing image URLs
};

type VehicleOwnership = {
  cl_org: CLOrg;
  status: string;
  comment: string;
  res_by_ins_id: string;
  res_by_ins_type: string;
  res_by_user_id: string;
  vehicle: Vehicle;
  // Add more properties as needed
};

type Res = {
  curr_days_in_yard: number;
  curr_total_park_fee: number;
  curr_total_waiver_park_fee: number | null;
  status: string;
  status_changed_at: string;
  vehicle_ownership: VehicleOwnership;
  vehicle: Vehicle;
  release_detail:ReleaseDetails;

};

type ResponseData = {
  message: string;
  res: Res;
};

type Inputs = {
  receiver_name: string;
  receiver_contact: string;
  payment_status: string;

};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const IndividualReleasedVehicle = ({ releaseId }) => {
  console.log("relased vehicle id",releaseId);
  
  const [vehicleData, setVehicleData] = useState<Res | null>(null);
  const [confirmModalOpen, setConfirmationModal] = useState(false);
  const [formModalOpen, setFormModalOpen]=useState(false)
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get<ResponseData>(
        `/release/${releaseId?.releasedVehicleId}`
      );
      setVehicleData(response.data.res);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

 




  const tabs = {
    "Yard Details": <YardDetails vehicle={vehicleData} />,
    "Vehicle Details": <VehicleDetails vehicle={vehicleData} />,
    "Vehicle Ownership": <VehicleOwnerships vehicle={vehicleData} />,
    "Release Details": <ReleaseDetails vehicle={vehicleData} />,
  }

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
         Released vehicle
        </h2>

        <section>
          <div>
            {/* <div className="mb-4 text-xl font-semibold text-gray-900">
              Vehicle Details
            </div> */}
            <div className="w-full mt-4  overflow-y-scroll h-96">
              <TabGroup>
                <TabList className="flex justify-between space-x-1 rounded-xl">
                  {Object.keys(tabs).map((tab) => (
                    <Tab
                      key={tab}
                      className={({ selected }) =>
                        classNames(
                          "w-full px-1 rounded-lg py-2.5 text-sm font-medium leading-5 bg-gray-200",
                          "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none",
                          selected
                            ? "bg-blue-900 text-black shadow"
                            : "text-[#787777] hover:text-gray-900"
                        )
                      }
                    >
                      {tab}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels className="mt-4">
                  {Object.values(tabs).map((tabContent, index) => (
                    <TabPanel
                      key={index}
                      className={"rounded-xl bg-white focus:outline-none"}
                    >
                      {tabContent}
                    </TabPanel>
                  ))}
                </TabPanels>
              </TabGroup>
            </div>

           
          </div>
        </section>

        
      </div>
   
      {
     
      }
    
    </div>
  );
};

export default IndividualReleasedVehicle;


