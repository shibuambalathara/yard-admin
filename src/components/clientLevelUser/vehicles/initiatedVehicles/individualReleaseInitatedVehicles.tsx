"use client"

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios'; // Replace with your axios instance path
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { inputStyle } from "@/components/ui/style"
import Spinner from '@/components/commonComponents/spinner/spinner';
import { ReleaseDetails, VehicleDetails, VehicleOwnerships, YardDetails } from '@/components/commonComponents/detailTabs/detailTabs';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
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
  vehicle: Vehicle
};

type Res = {
  curr_days_in_yard: number;
  curr_total_park_fee: number;
  curr_total_waiver_park_fee: number | null;
  release_detail: any | null; // Adjust as per actual data type
  status: string;
  status_changed_at: string;
  vehicle_ownership: VehicleOwnership;
  vehicle: Vehicle;
};

type ResponseData = {
  message: string;
  res: Res;
};

const IndividualReleaseInitiated = ({ releaseId }) => {
  const [vehicleData, setVehicleData] = useState<Res | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }
  const router = useRouter();

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get<ResponseData>(`/release/${releaseId?.initiatedVehicleId}`);
      console.log("individual initiated vehicles", response);
      setVehicleData(response?.data?.res);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const initiateVehicleRelease = async () => {
    const vehicleReleaseId = releaseId?.initiatedVehicleId;

    if (!vehicleReleaseId) {
      console.log("vehicleReleaseId is undefined or null");
      return;
    }
    try {
      const response = await axiosInstance.patch(`/release/client/cancel_req/${releaseId?.initiatedVehicleId}`);
      toast.success(response.data.message);
      router.push("/vehicles/initiatedVehicles");
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
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
       {modalOpen&&<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <ConfirmationModal
          isOpen={modalOpen}
          onCancel={handleCancelRelease}
          onConfirm={handleConfirmRelease}
         
        /></div>}  
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">Initiated Vehicle Details</h2>
      
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
       
        <div className="w-full  flex justify-center gap-5">
         <button
                  type="button"
                  onClick={()=>{
                    window.close()
                  }}
                  className="bg-red-500 text-white py-2 h-10 px-8 rounded hover:bg-red-600 transition duration-200"
                >
                  Back
                </button>
          <button
            onClick={handleInitiateClick}
            className="border py-2 px-4 text-white h-10 bg-blue-500 rounded-md shadow-lg hover:bg-blue-600 mr-2"
          >
            Cancel  Release
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualReleaseInitiated;

// ConfirmationModal.jsx

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white w-full md:max-w-md mx-auto rounded-lg shadow-lg overflow-hidden animate-fade-in-down">
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Confirm Action</h2>
          </div>
          <p className="text-gray-700 mb-6">Are you sure you want to cancel the initiated vehicle?</p>
          <div className="flex justify-end gap-3">
            
            <button
              onClick={onCancel}
              className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2 hover:bg-red-600 focus:outline-none"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


