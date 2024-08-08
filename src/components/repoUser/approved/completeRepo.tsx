"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Cities } from "@/utils/cities";
import { CiCirclePlus } from "react-icons/ci";
import {
  SelectChange,
} from "../../ui/fromFields";

type Inputs = {
  repo_vehicle_id: string;
  captured_state: string;
  captured_city: string;
  reason: string;
};

const CompleteRepo = ({ vehicleId }) => {
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
        ...data,
        status: "REPOSSESSION_COMPLETED"
      };
      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }
      images.forEach((image) => {
        formData.append("files", image);
      });

      const response = await axiosInstance.patch(`repossession/repo_veh_req/complete_repossession/${vehicleId?.vehId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
      });

      toast.success(response?.data?.message);
      router.push('/completedRepoVehicle');
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

  const onClose = () => {
    router.push('/approvedRepoVehicle');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Complete
        </h2>

        <div className="border-b"></div>

        <form className="space-y-2" onSubmit={handleSubmit(RepoReq)} encType="multipart/form-data">
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide">
            <div className="mt-4 pt-px">
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
            <div className="col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Upload Images
              </label>
              <input
                type="file"
                name="files"
                onChange={handleFileChange}
                multiple
                className="hidden"
              />
              <div className="flex flex-wrap items-center mb-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Upload Preview ${index}`}
                      className="w-72 border border-stone-500-800 p-1 rounded-md h-48 ml-4 mb-4 space-x-2"
                    />
                  </div>
                ))}
                <div className="ml-4">
                  <label className="w-40 h-40 border-4 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer mb-4">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex items-center justify-center space-x-2 ml-2">
                      <CiCirclePlus className="w-4 h-4 text-blue-600" />
                      <span className="text-gray-500">Choose file</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full text-center space-x-4">
            <button
              onClick={onClose}
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
