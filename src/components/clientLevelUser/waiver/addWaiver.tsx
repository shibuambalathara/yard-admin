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

const AddWaiver = ({onClose,selectedRowIds,fetch}) => {
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
      fetch()
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
    <div className="">
      <div className="bg-white p-4 rounded-lg w-fit ">
        
        <div className="flex w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className="  font-bold text-gray-400  ">Assign Waiver</h1>
          
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
                placeholder="Eg: 10"
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
                placeholder="Eg: Regular Customer"

              />
            </div> 
            </div>
            <div className=" w-full text-center p-1 mt-3  space-x-2">
            
            <button
            type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
               className="bg-green-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-green-600 transition duration-200"
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



