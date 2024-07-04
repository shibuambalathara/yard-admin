"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormFieldInput, TextArea } from "../../ui/fromFields";
import { formStyle } from "../../ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";

type Inputs = {
  name: string;
  description: string;
};

const ViewVehicleCategory = ({ categoryId,onClose,fetchData }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

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

  const FetchVehicleCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/vehicle/cat/${categoryId}`);
      console.log("RESPONSE FOR INDIVIDUAL VEHCAT", response);
      setCategoryData(response?.data?.vehicleCategory);
      reset(response?.data?.vehicleCategory);
   
    } catch (error) {
      console.log("error", error);
      // toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchVehicleCategory();
  }, []);

  const EditVehilceCategory = async (data: Inputs) => {
    setIsLoading(true);
    console.log("Data on submit", data);

    try {
      const modifiedData = {
        name: data?.name.toUpperCase(),
        description: data?.description,
      };

      const response = await axiosInstance.put(
        `/vehicle/cat/edit/${categoryId}`,
        modifiedData
      );
      setSuccess({
        text: response?.data?.message,
      });
      router.push("/vehicleCategoryManagement");
      onClose()
      fetchData()
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (

    <>
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <button
          onClick={()=>onClose()}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
        >
          
        </button>
        <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className=" font-bold  ">Edit Vehicle Category</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form onSubmit={handleSubmit(EditVehilceCategory)} className="  border-gray-200 ">
          <div className=" grid grid-cols-1 gap-5 justify-center  p-2 border ">
         <div>
         <FormFieldInput
          label=" Category Name"
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue={categoryData?.name}
          required
          placeholder=""
        />
        <TextArea
          label=" Category Description"
          type="text"
          name="description"
          register={register}
          error={errors.description}
          defaultValue={categoryData?.description}
          placeholder=" Description"
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
</>


  );
};

export default ViewVehicleCategory;
