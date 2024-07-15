"use client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormFieldInput, TextArea } from "@/components/ui/fromFields";
import { formStyle } from "@/components/ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";

type Inputs = {
  name: string;
  description: string;
};

const ViewClientCategory = ({ clientId,onClose,fetchData }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientcategoryData, SetClientCategoryData] = useState(null);
  const [isLoading,setIsLoading]=useState(true)
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  console.log("clientid",clientId);
  

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
  // console.log("categoryId", categoryId);

  const FetchVehicleCategory = async () => {
    setIsLoading(true)
    try {
      const response = await axiosInstance.get(
        `/clientorg/cat/${clientId}`
      );

      console.log("RESPONSE FOR INDIVIDAULA client", response);
      console.log("response",response);
      
      SetClientCategoryData(response?.data?.clientCategory);
      reset(response?.data?.clientCategory);
    } catch (error) {
      console.log("error", error);
    }finally{
      setIsLoading(false)
    }
  };

  // console.log('456',categoryData);

  useEffect(() => {
    FetchVehicleCategory();
  }, []);

  console.log("jdflasjfl;a",typeof(clientId));
  

  const EditClientCategory = async (data: Inputs) => {
    console.log("Data on submit", data);

    try {
      const modifiedData = {
        name: data?.name.toUpperCase(),
        description: data?.description,
      };
console.log('clientCatId',typeof(clientId));

      const response = await axiosInstance.put(
        `/clientorg/cat/edit/${clientId}`,
        modifiedData
      );
      console.log("Response:", response);
      setSuccess({
        text: response?.data?.message,
      });
      // router.push('');
      router.push("/clientCategoryManagement");
      onClose()
      fetchData()
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
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
    <h1 className=" font-bold  ">Edit Client Category</h1>
    {/* <p className=" cursor-pointer" onClick={onClose}>
      x
    </p> */}
  </div>
  <form
  onSubmit={handleSubmit(EditClientCategory)}
  
  className="  border-gray-200 ">
    <div className=" grid grid-cols-1 gap-2 justify-center  p-2 border ">
   <div>
   <FormFieldInput
      label="Category Name"
      type="text"
      name="name"
      register={register}
      error={errors.name}
      defaultValue=""
      required
      placeholder=" Category Name"
    />
   </div>
    <div>
    <TextArea
      label=" Category Description"
      type="text"
      name="description"
      register={register}
      error={errors.description}
      defaultValue=""
      required
      placeholder=" Category Description"
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

export default ViewClientCategory;


