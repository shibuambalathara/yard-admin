"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { InputField } from "@/components/ui/fromFields";
import { ConfirmationModal } from "./confirm";

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
    <ConfirmationModal
    // open=''
    onConfirm={ RepoReq}
     onCancel={onClose}
     message ='Are you sure you want to close this vehicle?'
    /> 
  );
};

export default RepoClose;
