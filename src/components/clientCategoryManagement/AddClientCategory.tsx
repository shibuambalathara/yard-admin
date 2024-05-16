"use client";
import React,{useState,useEffect} from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
} from "@/components//ui/fromFields"
import {formStyle} from "@/components//ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from 'next/navigation';
import toast from "react-hot-toast";
type Inputs = {
  name: string;
  description: string;
};

const Addcategory = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
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

  const AddVehicleCategory = async(data: Inputs) => {
    try {
      const modifiedData={
        ...data,
        name:data?.name.toUpperCase()
      }
   const response = await axiosInstance.post('/vehicle/cat/add', modifiedData);
      console.log("Response:", response);
      setSuccess({
        text: response?.data?.message,
    });
      // router.push('');

    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message)
      

    }

  };

  return (
    <div className="flex items-center justify-center border-2 h-full  w-full ">
      <form
        className={`${formStyle.data}`}
        onSubmit={handleSubmit(AddVehicleCategory)}
      >
        <div className="w-full  text-center uppercase font-bold">
          <h1>Add Vehicle Category</h1>
        </div>

        <FormFieldInput
          label=""
          type="text"
          name="name"
          register={register}
          error={errors.name}
          defaultValue=""
          required
          placeholder="Enter Category Name"
        />
        <TextArea
          label=""
          type="text"
          name="description"
          register={register}
          error={errors.description}
          defaultValue=""
          required
          placeholder=" Enter Description"
        />

        <div className="w-full">
          <button
            type="submit"
            className="bg-[#333333] text-white px-4 py-1 w-full"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default Addcategory;
