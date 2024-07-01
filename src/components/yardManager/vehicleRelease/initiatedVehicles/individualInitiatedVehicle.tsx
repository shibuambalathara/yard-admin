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
  vehicle: Vehicle;
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

type Inputs = {
  receiver_name: string;
  receiver_contact: string;
  payment_status: string;

};
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const IndividualInitiatedVehicles = ({ initiatedId }) => {
  console.log("initiatedId",initiatedId);
  
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
        `/release/${initiatedId?.InitiatedVehicleId}`
      );
      console.log("individual initiated vehicles", response);
      setVehicleData(response.data.res);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

 

  const handleInitiateClick = () => {
    setConfirmationModal(true);
  };

  const handleConfirmRelease = async () => {
    setConfirmationModal(false);
    setFormModalOpen(true)
    // await initiateVehicleRelease();
  };

  const handleCancelRelease = () => {
    setFormModalOpen(false)
    setConfirmationModal(false);

  };
  const InitiateVehicleRelease=async(data:Inputs)=>{

    console.log("initiatedId?.initiatedVehicleId",initiatedId?.InitiatedVehicleId);
    
    try {

      const modifiedData={
        ...data,
        receiver_contact: `+91${data?.receiver_contact}`,

      }
      
      const response=await axiosInstance.put(`/release/${initiatedId?.InitiatedVehicleId}`,modifiedData)
      console.log("response from initiate vehicle release",response);
      
      toast.success(response?.data?.message)
      setFormModalOpen(false)
      router.push("/releasevehicle/initiatedVehicles")
      router.back();
    } catch (error) {
      console.log("error from initiate vehicle release",error);
      toast.error(error?.response?.data?.message)
    }
   }



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
    "Vehicle ownership": <VehicleOwnerships vehicle={vehicleData} />,
  }

  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Initiate Release
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

            <div className="w-full  flex justify-start">
          <button
            onClick={handleInitiateClick}
            className="border p-2 text-white bg-green-400 rounded-md shadow-lg hover:bg-green-600 "
          >
            Initate Vehicle Release
          </button>
        </div>
          </div>
        </section>

        <ConfirmationModal
          isOpen={confirmModalOpen}
          onCancel={handleCancelRelease}
          onConfirm={handleConfirmRelease}
        />
      </div>
   
      {
        formModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
            <form onSubmit={handleSubmit(InitiateVehicleRelease)}>
              <div className="mb-4">
              <InputField
              label="Receiver Name"
              type="text"
              name="receiver_name"
              register={register}
              errors={errors}
              pattern
            />
           
              </div>
              <div className="mb-4">
              <InputField
              label="Receiver Contact"
              type="tel"
              name="receiver_contact"
              register={register}
              errors={errors}
              pattern
            />
              </div>
              <div className="mb-4">
              <SelectComponent
                label="Select Payment Status"
                name="payment_status"
                options={paymentStatus}
                register={register}
                errors={errors}
                defaultValue=""
              />
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleCancelRelease}
                  className="bg-red-500 text-white px-10 py-2 rounded-md mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-10 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>)
      }
     
    
    </div>
  );
};

export default IndividualInitiatedVehicles;




const Modal = ({ isOpen, toggleModal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all">
        <h2 className="text-2xl font-bold mb-4">Enter Your Details</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">First Input</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Second Input</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Third Input</label>
            <input
              type="text"
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={toggleModal}
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};




const YardDetails = ({ vehicle }) => {
  return (
    <div className="border border-gray-200 px-4 py-5 sm:p-0 rounded">
      <dl className="sm:divide-y sm:divide-gray-200">
        <Detail
          title="Yard Name"
          value={vehicle?.vehicle_ownership?.vehicle?.yard?.yard_name}
        />
        <Detail
          title="Yard Code"
          value={vehicle?.vehicle_ownership?.vehicle?.yard?.code}
        />
        <Detail
          title="Current Days in Yard"
          value={vehicle?.curr_days_in_yard}
        />
        <Detail title="Total Park Fee" value={vehicle?.curr_total_park_fee} />
        <Detail
          title="Total Waiver Park Fee"
          value={vehicle?.curr_total_waiver_park_fee}
        />
      </dl>
    </div>
  );
};

const VehicleDetails = ({ vehicle }) => {
  const actual_entry_date = vehicle?.vehicle_ownership?.vehicle?.actual_entry_date ? vehicle?.vehicle_ownership?.vehicle?.actual_entry_date.split("T")[0]: null;
console.log("");

  return (
    <div className="border border-gray-200 px-4 py-5 sm:p-0 rounded">
      <dl className="sm:divide-y sm:divide-gray-200">
        <Detail
          title="Actual Entry Date."
          value={actual_entry_date}
        />
        <Detail
          title="Code"
          value={vehicle?.vehicle_ownership?.vehicle?.code}
        />
        <Detail
          title="Make"
          value={vehicle?.vehicle_ownership?.vehicle?.make}
        />
        <Detail
          title="Model"
          value={vehicle?.vehicle_ownership?.vehicle?.model}
        />
        <Detail
          title="Park fee Per Day"
          value={vehicle?.vehicle_ownership?.vehicle?.park_fee_per_day}
        />
        <Detail
          title="Registration Number"
          value={vehicle?.vehicle_ownership?.vehicle?.reg_number}
        />
        <Detail
          title="Vehicle Category"
          value={vehicle?.vehicle_ownership?.vehicle?.vehicle_category?.name}
        />
      </dl>
    </div>
  );
};

const VehicleOwnerships = ({ vehicle }) => {

  console.log("444", vehicle?.vehicle_ownership?.cl_org?.cl_org_name);

  return (
    <div className="border border-gray-200 px-4 py-5 sm:p-0 rounded">
      <dl className="sm:divide-y sm:divide-gray-200">
        <Detail
          title="Client Organisation Name"
          value={vehicle?.vehicle_ownership?.cl_org?.cl_org_name}
        />
        <Detail title="Code" value={vehicle?.vehicle_ownership?.cl_org?.code} />
        <Detail title="Comment" value={vehicle?.vehicle_ownership?.comment} />
        <Detail title="Status" value={vehicle?.vehicle_ownership?.status} />
      </dl>
    </div>
  );
};


const Detail = ({ title, value }) => (
  <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5 sm:px-6">
    <dt className="text-sm font-bold text-gray-500">{title}</dt>
    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
      {" "}
      {value ? value : "N/A"}
    </dd>
    
  </div>
);
