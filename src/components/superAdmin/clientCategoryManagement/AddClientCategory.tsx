"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  TextArea,
} from "@/components//ui/fromFields";
import { formStyle } from "@/components//ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
type Inputs = {
  name: string;
  description: string;
};

const Addcategory = ({ onClose,fetchData }) => {
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

  const AddVehicleCategory = async (data: Inputs) => {
    console.log("data on sumbit",data);
    
    try {
      const modifiedData = {
        ...data,
        name: data?.name?.toUpperCase()
      };
      const response = await axiosInstance.post(
        "/clientorg/cat/add",
        modifiedData
      );
      fetchData()
      console.log("Response: of cateogory created", response);
      setSuccess({
        text: response?.data?.message,
      });
      setTimeout(() => {
        onClose();
      }, 200);
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
   
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className=" font-bold  ">Add Client</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form
          className={`${formStyle.data}`}
          onSubmit={handleSubmit(AddVehicleCategory)}
        >
          <div className="w-full  text-center uppercase font-bold">
            <h1>Add Client Category</h1>
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
    </div>
  );
};

export default Addcategory;
