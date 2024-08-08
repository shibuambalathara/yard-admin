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
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const RepoReq = async (data: Inputs) => {
    setIsLoading(true);
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center relative py-10">
      <div className="bg-white rounded-lg p-5  w-full space-y-3">
        <div>
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            Repo Request
          </h1>
          <div className=""></div>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit(RepoReq)} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide">
            <div className="mt-4 pt-px">
              <SelectChange
                label="State"
                name="initial_state"
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
                name="initial_city"
                options={filterCity}
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <ImageUpload images={images} setImages={setImages} />
          </div>
          <div className="w-full text-center space-x-4">
            <button
              // onClick={() => onClose()}
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

export default RepoRequest;
