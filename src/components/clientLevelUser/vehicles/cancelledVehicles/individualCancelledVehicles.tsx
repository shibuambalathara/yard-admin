"use client"

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios'; // Replace with your axios instance path
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import  {inputStyle} from "@/components/ui/style"
import Spinner from '@/components/commonComponents/spinner/spinner';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { YardDetails, VehicleDetails, VehicleOwnerships, ReleaseDetails } from '@/components/commonComponents/detailTabs/detailTabs';
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
  vehicle:Vehicle
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

type ResponseData = {
  message: string;
  res: Res;
};

const IndividualRelease = ({ cancelledId }) => {
  console.log(cancelledId);
  
  const [vehicleData, setVehicleData] = useState<Res | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get<ResponseData>(`/release/${cancelledId?.cancelledVehicleId}`);
      console.log("individual initiated vehicles", response);
      setVehicleData(response?.data?.res)
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("vehicleData state",vehicleData);
  
  useEffect(() => {
    fetchVehicle();
  }, []);

  const initiateVehicleRelease = async () => {
  
    
    const vehicleReleaseId = cancelledId?.cancelledVehicleId;
 
    if (!vehicleReleaseId) {
      console.log("vehicleReleaseId is undefined or null");
      return;
    }
    try {
      const response = await axiosInstance.patch(`/release/client/cancel_req/${cancelledId?.cancelledVehicleId}`);
      toast.success(response.data.message);
      router.push("/vehiclesSuperOrg /initiatedVehicles");
      console.log("response of post method", response);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error of post method", error);
    }
  };
  const handleInitiateClick = () => {
    setModalOpen(true);
  };

  const handleConfirmRelease = async () => {
    setModalOpen(false);
    await initiateVehicleRelease();
  };

  const handleCancelRelease = () => {
    setModalOpen(false);
  };


  if (!vehicleData) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Spinner />
      </div>
    );
  }
  const tabs = {
    "Yard Details": <YardDetails vehicle={vehicleData} />,
    "Vehicle Details": <VehicleDetails vehicle={vehicleData} />,
    "Vehicle Ownership": <VehicleOwnerships vehicle={vehicleData} />,
    
  }

 
 

  
  
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:py-6  lg:px-8   sm:px-3 sm:py-3 ">
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">Cancelled Vehicle</h2>

        {/* <div className="w-full flex justify-end">
          <button
            onClick={handleInitiateClick}
            className="border p-2 text-white bg-green-400 rounded-md shadow-lg hover:bg-green-600"
          >
            CANCEL VEHICLE RELEASE
          </button>
        </div> */}
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
{/* 
        <div>
          <h2 className="text-center text-xl font-semibold text-gray-900 col-span-3">Vehicle Ownership</h2>
          <div className="border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-4 py-4">
            <div>
              <label className="font-semibold">Ownership Status:</label>
              <p>{ownership_status}</p>
            </div>
            <div>
              <label className="font-semibold">Status Changed At:</label>
              <p>{new Date(status_changed_at).toLocaleString()}</p>
            </div>
            <div>
              <label className="font-semibold">Vehicle Ownership:</label>
              <p>{vehicle_ownership.cl_org_name}</p>
            </div>
            <div>
              <label className="font-semibold">Comment:</label>
              <p>{comment}</p>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-center text-xl font-semibold text-gray-900 col-span-3">Current Yard Information</h2>
          <div className="border grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 place-items-center mt-4 py-4">
            <div>
              <label className="font-semibold">Days in Yard:</label>
              <p>{curr_days_in_yard}</p>
            </div>
            <div>
              <label className="font-semibold">Total Parking Fee:</label>
              <p>{curr_total_park_fee}</p>
            </div>
            <div>
              <label className="font-semibold">Total Waiver Parking Fee:</label>
              <p>{curr_total_waiver_park_fee ? curr_total_waiver_park_fee : 'N/A'}</p>
            </div>
          </div>
        </div> */}
 {/* <ConfirmationModal
          isOpen={modalOpen}
          onCancel={handleCancelRelease}
          onConfirm={handleConfirmRelease}
        /> */}
      </div>
    </div>
  );
};

export default IndividualRelease;


// ConfirmationModal.jsx



const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
    <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden animate-fade-in-down">
      <div className="relative p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Confirm Action</h2>
          {/* <button onClick={onCancel} className="text-gray-500 hover:text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button> */}
        </div>
        <p className="text-gray-700 mb-6">Are you sure you want to cancel the initiated  vehicle ?</p>
        <div className="flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
          >
            Confirm
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg ml-2 hover:bg-gray-400 focus:outline-none"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

// export default ConfirmationModal;



