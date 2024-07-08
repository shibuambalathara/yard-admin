"use client"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  Role,
  DocumentType,
  SuperUserChildren,
} from "../../../utils/staticData";
import FileUploadInput, {
  FormFieldInput,
  FormFieldPassword,
  InputField,
  SelectComponent,
  SelectInput,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { inputStyle, labelStyle, loginInputStyle } from "@/components/ui/style";

type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const CreateUser = ({ onClose,fetchData }:any) => {
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

  const bidStatusOptions = [
    { label: "Yard Manager", value: "YARD_MANAGER" },
    { label: "Client Level  User", value: "CLIENT_LEVEL_USER" },
  ];

  const password = watch("password");

  const CreateUser = async (data: Inputs) => {
    try {
      const modifiedData = {
        ...data,
        contact: `+91${data.contact}`,
        name: data?.name.toUpperCase(),
      };

      const response = await axiosInstance.post("/user/create/pending", modifiedData);
      toast.success(response?.data?.message)
      onClose()
      fetchData()
      router.push("/userCreation")
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  const close=()=>{
    router.back()
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Create User</h1>
        {/* <p className="cursor-pointer text-gray-500" onClick={onClose}>x</p> */}
      </div>
      <form onSubmit={handleSubmit(CreateUser)} className="space-y-6">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
          <FormFieldInput
                label="Enter your name"
                type="text"
                name="name"
                register={register}
                error={errors.name}
                defaultValue=""
                required
                placeholder=""
             
              />
          </div>
          <div className="col-span-1">
          <FormFieldInput
                label="Enter your email address"
                type="email"
                name="email"
                register={register}
                error={errors.email}
                defaultValue=""
                required
                placeholder=""
                
              />
          </div>
          <div className="col-span-1">
          <FormFieldInput
                label="Enter your contact number"
                type="text"
                name="contact"
                register={register}
                error={errors.contact}
                defaultValue=""
                required
                placeholder=""
               
              />
          </div>
          <div className="col-span-1">
          <FormFieldInput
                label="Enter your designation"
                type="text"
                name="designation"
                register={register}
                error={errors.designation}
                defaultValue=""
                required
                placeholder=""
            
              />
          </div>
          <div className="col-span-1">
          <FormFieldInput
                label="Enter Password"
                type="password"
                name="password"
                register={register}
                error={errors.name}
                defaultValue=""
                required
                placeholder=""
             
              />
          </div>
          <div className="col-span-1">
          <SelectComponent
                label="Select Role"
                name="role"
                options={SuperUserChildren}
                register={register}
                errors={errors}
                defaultValue=""
                placeholder=""
              />

          </div>
          
         
          
        </div>
        <div className="w-full text-center pt-4 space-x-4 ">
        <button
                type="button"
                onClick={close}
                className="bg-red-500 text-white py-2 px-10  rounded-md hover:bg-red-600 transition duration-200"
              >
                Back
              </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-10 rounded-md hover:bg-green-700 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default CreateUser;
