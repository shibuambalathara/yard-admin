"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { InputField } from "@/components/ui/fromFields";

type Inputs = {
  status: string;
  start_date?: string;
  end_date?: string;
  reason?: string;
};

const RepoClose = ({ onClose, vehicleId, fetchData, status,user }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
   console.log(vehicleId);
   
  const RepoReq = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.patch(`repossession/repo_veh_req/close_repo_vehicle/${vehicleId?.repoId}`);
      console.log("Response:", response);
      toast.success(response?.data?.message);

      fetchData();
      onClose();
    router.push('/repoClose');
         

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
    <div className="flex items-center justify-center relative z-50">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3">
        <div>
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            Repo Request
          </h1>
          <div className="border-b"></div>
        </div>
        <form className="space-y-2" onSubmit={handleSubmit(RepoReq)}>
          

           <p className="text-red-500  py-6">*Are u sure to close this vehicle </p>
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

export default RepoClose;