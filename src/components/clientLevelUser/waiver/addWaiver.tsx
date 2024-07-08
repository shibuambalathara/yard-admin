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
  cl_org_id: string,
  vehicleOwnershipIds: string,
  fee_per_day: string,
  reason: string
};

const AddWaiver = ({onClose,selectedRowIds}) => {
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



  const AddVehicleCategory = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const modifiedData = {
        ...data,
        fee_per_day: parseInt(data?.fee_per_day),
        vehicleOwnershipIds:selectedRowIds
       
        
      }; console.log(modifiedData);
      const response = await axiosInstance.post(
        "waiver/create",
        modifiedData
      );
      console.log("Response:", response);
      setSuccess({
        text: response?.data?.message,
      });
      // router.push('/vehicleCategoryManagement');
      setTimeout(() => {
        onClose();
      }, 100);
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
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg ">
        
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className=" text-2xl font-bold text-gray-700  ">Assign Waiver</h1>
          <p className=" cursor-pointer"
           onClick={onClose}
           >
            x
          </p>
        </div>
        <form
          className={`  border-gray-200  justify-center  p-2 border   `}
          onSubmit={handleSubmit(AddVehicleCategory)}
        >
        
              <div className="grid grid-cols-1 gap-2 justify-center  p-2 ">
          {/* <div className="mb-">
          <SelectComponent
                label="Select Client Organisation"
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            {/* <div className="mb-">
              <InputField
                label="Ownership"
                type="zstring"
                name="vehicleOwnershipIds"
                register={register}
                errors={errors}
                pattern=""
              />
            </div> */}
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
            <div className=" w-full text-center p-1 mt-3  space-x-2">
            
            <button
            type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWaiver;



