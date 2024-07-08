"use client";
import React, { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
  InputField,
  SelectComponent,
} from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Link from "next/link";
import Loading from "@/app/(home)/(superAdmin)/loading";
type Inputs = {
  cl_org_id: string;
  vehicleOwnershipIds: string;
  fee_per_day: string;
  reason: string;
};

const AddWaiver = ({ onClose, selectedRowIds, client ,fetchData}) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initially set to true to show loading spinner
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
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

  const AddWaiver = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const modifiedData = {
        ...data,
        cl_org_id: client,
        fee_per_day: parseInt(data?.fee_per_day),
        vehicleOwnershipIds: selectedRowIds,
      };
      console.log(modifiedData);
      const response = await axiosInstance.post("waiver/create", modifiedData);
      console.log("Response:", response);
      setSuccess({
        text: response?.data?.message,
      });
      // router.push('/vehicleCategoryManagement');
      setTimeout(() => {
        onClose();
      }, 100);
      fetchData()
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center border-2 h-full w-full">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 ">
        <div className="">
          <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">
            create Waiver
          </h1>
          <div className="border-b "></div>
        </div>

        <form
          className="space-y-2  "
          onSubmit={handleSubmit(AddWaiver)}
        >
          <div className="grid  grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide ">
            <div className="mb-">
              <InputField
                label="Fee Per Day"
                type="number"
                name="fee_per_day"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="Reason"
                type="zstring"
                name="reason"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
          </div>
          <div className="w-full  text-center space-x-4">
            <button
              onClick={() => onClose()}
              type="button"
              className="bg-gradient-to-r from-red-500 uppercase to-red-700 text-white py-2 px-6 rounded-lg  hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-green-500 uppercase to-green-700 text-white py-2 px-6 rounded-lg  hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWaiver;
