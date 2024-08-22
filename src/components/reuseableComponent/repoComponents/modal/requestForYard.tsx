"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { FutureDate, InputField, SelectComponentWithOnchange } from "@/components/ui/fromFields";

type Inputs = {
  start_date?: string;
  expected_entry_date?: string;
  reason?: string;
  yard_id: string;
};

const RepoYardRequest = (props) => {
  const { onClose, vehicleId, fetchData, yard }=props
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<Inputs>();
  const [yardId, setYardId] = useState("");

  const handleYardChange = (event) => {
    const selectedYardId = event.target.value;
    setYardId(selectedYardId);
    setValue("yard_id", selectedYardId); // Set the value in the form
  };

  const RepoReq = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const modifiedData = {
        repo_vehicle_id: vehicleId,
        yard_id: yardId,
       
      };

      const response = await axiosInstance.post(`repo_yard/request_entry`, modifiedData);
      console.log("Response:", response);
      toast.success(response?.data?.message);
         if(fetchData){
          fetchData();
         }
      
      onClose();
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      toast.success(success.text ? success.text : "Success");
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(error.text ? error.text : "Something went wrong. Please contact support");
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
    <div className="flex items-center justify-center relative z-50">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3">
        <div>
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            Yard Request
          </h1>
          <div className="border-b"></div>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit(RepoReq)}>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide">
            <>
              <SelectComponentWithOnchange
                label="Select Yard"
                options={yard}
                name="yard_id"
                register={register}
                errors={errors}
                required={true}
                value={yardId}
                onChangeHandler={handleYardChange}
              />
              {/* <FutureDate
                label="Expected Entry Date & Time"
                type="datetime-local"
                name="expected_entry_date"
                register={register}
                errors={errors}
                pattern
              /> */}
            </>
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

export default RepoYardRequest;
