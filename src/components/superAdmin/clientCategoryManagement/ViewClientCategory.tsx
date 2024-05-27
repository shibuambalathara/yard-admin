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

const ViewClientCategory = ({ clientId }) => {
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
        `/clientorg/cat/${clientId?.clientId}`
      );

      console.log("RESPONSE FOR INDIVIDAULA client", response);
      SetClientCategoryData(response?.data?.clientCategory);
      reset(response?.data?.clientCategory);
    } catch (error) {
      // console.log("error", error);
    }finally{
      setIsLoading(false)
    }
  };

  // console.log('456',categoryData);

  useEffect(() => {
    FetchVehicleCategory();
  }, []);

  console.log("jdflasjfl;a",typeof(clientId?.clientId));
  

  const EditClientCategory = async (data: Inputs) => {
    console.log("Data on submit", data);

    try {
      const modifiedData = {
        name: data?.name.toUpperCase(),
        description: data?.description,
      };
console.log('clientCatId',typeof(clientId?.clientId));

      const response = await axiosInstance.put(
        `/clientorg/cat/edit/${clientId?.clientId}`,
        modifiedData
      );
      console.log("Response:", response);
      setSuccess({
        text: response?.data?.message,
      });
      // router.push('');
      router.push("/clientCategoryManagement");
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
    <div className="flex items-center justify-center border-2 h-full  w-full ">
      <form
        className={`${formStyle.data}`}
        onSubmit={handleSubmit(EditClientCategory)}
      >
        <div className="w-full  text-center uppercase font-bold">
          <h1>Edit Vehicle Category</h1>
        </div>

        <FormFieldInput
          label=""
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue={clientcategoryData?.name}
          required
          placeholder="Enter Category Name"
        />
        <TextArea
          label=""
          type="text"
          name="description"
          register={register}
          error={errors.description}
          defaultValue={clientcategoryData?.description}
          placeholder=" Enter Description"
        />

        <div className="w-full">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full"
          >
            Edit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewClientCategory;
