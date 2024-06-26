"use client"

import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../../utils/axios'; // Replace with your axios instance path
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import  {inputStyle} from "@/components/ui/style"
import Spinner from '@/components/commonComponents/spinner/spinner';

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

const IndividualRelease = ({ releaseId }) => {
  console.log(releaseId);
  
  const [vehicleData, setVehicleData] = useState<Res | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get<ResponseData>(`/release/${releaseId?.releasedVehicleId}`);
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
    console.log("AFHADKLFHASDKFASKDFHAKSDFH");
    
    const vehicleReleaseId = releaseId?.releasedVehicleId;
 
    if (!vehicleReleaseId) {
      console.log("vehicleReleaseId is undefined or null");
      return;
    }
    try {
      const response = await axiosInstance.patch(`/release/client/cancel_req/${releaseId?.releasedVehicleId}`);
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

 

  
  
  const { vehicle_ownership, curr_days_in_yard, curr_total_park_fee, curr_total_waiver_park_fee, status_changed_at } = vehicleData;
  const { yard } = vehicle_ownership.vehicle;
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">Initiate Release</h2>

        <div className="w-full flex justify-end">
          <button
            onClick={handleInitiateClick}
            className="border p-2 text-white bg-green-400 rounded-md shadow-lg hover:bg-green-600"
          >
            CANCEL VEHICLE RELEASE
          </button>
        </div>

        <div>
          <h2 className="text-center text-xl font-semibold text-gray-900 col-span-3">Yard Details</h2>
          <div className="border grid grid-cols-1 md:grid-cols-2 gap-3 px-8 mt-4 py-4">
            <div>
              <label className="font-semibold">Yard Name:</label>
              <p className=''>{yard?.yard_name}</p>
            </div>
            <div>
              <label className="font-semibold">Current Days In Yard:</label>
              <p>{curr_days_in_yard}</p>
            </div>
            <div>
              <label className="font-semibold">Total Park Fee:</label>
              <p>{curr_total_park_fee}</p>
            </div>
            <div>
              <label className="font-semibold">Total Waiver Park Fee:</label>
              <p>{curr_total_waiver_park_fee ?? 'N/A'}</p>
            </div>
          </div>
        </div>

{/* 
        <div>
          <h2 className="text-center text-xl font-semibold text-gray-900 col-span-3">Vehicle Ownership</h2>
          <div className="border grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center mt-4 py-4">
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
          <div className="border grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center mt-4 py-4">
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



