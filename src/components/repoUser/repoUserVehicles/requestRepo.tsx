"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  SelectChange,
} from "../../ui/fromFields";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Cities } from "@/utils/cities";
import { CiCirclePlus } from "react-icons/ci";
import ImageUpload from "@/components/reuseableComponent/imageUpload/imageUpload";

type Inputs = {
  repo_vehicle_id: string;
  initial_state: string;
  initial_city: string;
 
};

const RepoRequest = (props) => {
  const {  vehicleId }=props
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState([]);
  const router = useRouter();
  const [imageError, setImageError] = useState<string | null>(null); // New state for image error
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const RepoReq = async (data: Inputs) => {
   
    if (images.length === 0) {
      // If no images, set an error and prevent submission
      setImageError("Please upload at least one image.");
      return;
    }
    try {
      const formData = new FormData();


      const modifiedData = {
        
        repo_vehicle_id:`${vehicleId?.vehId}`,
        initial_state:data.initial_state,
        initial_city: data.initial_city,
      };
      console.log(modifiedData);
      
      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }
      // formData.append("repo_vehicle_id", vehicleId?.vehId);
      // formData.append("initial_state", data.initial_state);
      // formData.append("initial_city", data.initial_city);
      // formData.append("reason", data.reason);

      images.forEach((image) => {
        formData.append("files", image);
      });

      const response = await axiosInstance.post("repossession/repo_veh_req", formData,{
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });

      toast.success(response?.data?.message);
      
      router.push('/repoUserVehicles');
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

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([...images, file]);
    }
  };
  const onClose = () => {
    router.push('/repoUserVehicles');
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

  

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 lg:py-6  lg:px-8   sm:px-3 sm:py-3 ">
  <div className="lg:max-w-5xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-md">
    <h2 className="text-center text-2xl font-bold text-gray-900">Provide  Details</h2>
    
    <form className="space-y-6" onSubmit={handleSubmit(RepoReq)} encType="multipart/form-data">
      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <SelectChange
            label="Initial State"
            name="initial_state"
            options={uniqueStates}
            register={register}
            errors={errors}
            required
            defaultValue=""
            handleChange={handleStateChange}
          />
          <SelectChange
            label="Initial City"
            name="initial_city"
            options={filterCity}
            register={register}
            errors={errors}
            required
            defaultValue=""
          />
        </div>
        
        <ImageUpload images={images} setImages={setImages} />
        {imageError && <p className="text-red-500 text-sm ">{imageError}</p>}
      </div>
      
      <div className="text-center space-x-4">
        <button
          onClick={onClose}
          type="button"
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-200"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
  );
};

export default RepoRequest;
