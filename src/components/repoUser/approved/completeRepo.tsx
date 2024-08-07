"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
  InputField,
  SelectComponent,
  SelectChange,
} from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Cities } from "@/utils/cities";

type Inputs = {
  repo_vehicle_id: string;
  captured_state: string;
  captured_city: string;
  reason: string;
  files: [];
};

const CompleteRepo = ({  vehicleId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<Inputs>();
 console.log(vehicleId);
 
  const RepoReq = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const modifiedData = {
        ...data,
        
        status:"REPOSSESSION_COMPLETED"
      };
      console.log(modifiedData);
      const response = await axiosInstance.patch(`repossession/repo_veh_req/complete_repossession/${vehicleId?.vehId}`, modifiedData);
      console.log("Response:", response);
      toast.success(response?.data?.message)
      

      router.push('/completedRepoVehicle')
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const stateData = Cities.filter((item) => item.state === selectedState);
    setFilterCity(stateData.map((item) => item.city));
  };  

  useEffect(() => {
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);
    setUniqueStates(uniqueStates);
  }, []);

  useEffect(() => {
    if (success) {
      toast.success(success.text ? success.text : "Success");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(
        error.text ? error.text : "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);

  const onClose=()=>{
    router.push('/approvedRepoVehicle')
    }
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start   justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
           Complete   
        </h2>

          <div className="border-b"></div>
        
        <form className="space-y-2" onSubmit={handleSubmit(RepoReq)}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide">
            <div className="mt-4 pt-px">

            {/* <FileUploadInput
              label="Front image"
              name="files" // Accessing FRONT_IMAGE from files
              register={register}
              accept="image/*"
            
            /> */}

              <SelectChange
                label="State"
                name="captured_state"
                options={uniqueStates}
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                handleChange={handleStateChange}
              />
            </div>
            <div>
              <SelectChange
                label="City"
                name="captured_city"
                options={filterCity}
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
          </div>
          <div className="w-full text-center space-x-4">
            <button
              onClick={() => onClose()}
              type="button"
              className="bg-gradient-to-r from-red-500 uppercase to-red-700 text-white py-2 px-6 rounded-lg hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 uppercase to-green-700 text-white py-2 px-6 rounded-lg hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
            >
             Submit
            </button>
          </div>
        </form>
      </div>
      </div>
  );
};

export default CompleteRepo;
