

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

const IndividualReleasedVehicle = ({ releasedId }) => {
  console.log("relased vehicle id",releasedId);
  
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
        `/release/${releasedId?.releasedVehicleId}`
      );
      console.log("individual released vehicles", response);
      setVehicleData(response.data.res);
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

 

  const handleInitiateClick = () => {
    setFormModalOpen(true);
  };

  const handleConfirmRelease = async () => {
    setConfirmationModal(false);
    setFormModalOpen(true)
    // await initiateVehicleRelease();
  };

  const handleCancelRelease = () => {
    setFormModalOpen(false)
 

  };
  const updateReleasedDetails=async(data:Inputs)=>{
console.log("ilnut datas",data);

    console.log("initiatedId?.initiatedVehicleId",vehicleData);
    
    try {

      const modifiedData={
        ...data,
        receiver_contact: `+91${data?.receiver_contact}`,

      }
      
      const response=await axiosInstance.patch(`/release/${vehicleData?.release_detail?.id}`,modifiedData)
      console.log("response from initiate vehicle release",response);
      
      toast.success(response?.data?.message)
      setFormModalOpen(false)
      router.push("/releasevehicle/releasedVehicles")
      window.close()
    } catch (error) {
      console.log("error from initiate vehicle release",error);
      toast.error(error?.response?.data?.message)
    }
   }



  // if (!vehicleData) {
  //   return (
  //     <div className="flex w-full h-screen items-center justify-center">
  //       <Spinner />
  //     </div>
  //   );
  // }

  const tabs = {
    "Yard Details": <YardDetails vehicle={vehicleData} />,
    "Vehicle Details": <VehicleDetails vehicle={vehicleData} />,
    "Vehicle Ownership": <VehicleOwnerships vehicle={vehicleData} />,
    "Release Details": <ReleaseDetails vehicle={vehicleData} />,
  }

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:py-6  lg:px-8   sm:px-3 sm:py-3 ">
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">
         Released Vehicle
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
            Update Release
          </button>
        </div>
      </div>
   
      {
        formModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center  z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full transform transition-all flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold mb-4">Enter  Details</h2>
            <form onSubmit={handleSubmit(updateReleasedDetails)}>
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

export default IndividualReleasedVehicle;





  
  



