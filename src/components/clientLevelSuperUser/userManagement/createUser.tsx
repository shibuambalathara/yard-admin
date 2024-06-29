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

  const onSubmit = async (data: Inputs) => {
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
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 ">
        <h1 className="p-2 uppercase text-center">create User</h1>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2  h-56 overflow-y-scroll scrollbar-hide">
            <div>
              <FormFieldInput
                label=""
                type="text"
                name="name"
                register={register}
                error={errors.name}
                defaultValue=""
                required
                placeholder="Enter your name"
             
              />
            </div>
            <div>
              <FormFieldInput
                label=""
                type="email"
                name="email"
                register={register}
                error={errors.email}
                defaultValue=""
                required
                placeholder="Enter your email address"
                
              />
            </div>
            <div>
              <FormFieldInput
                label=""
                type="text"
                name="contact"
                register={register}
                error={errors.contact}
                defaultValue=""
                required
                placeholder="Enter your contact number"
               
              />
            </div>
            <div>
              <FormFieldInput
                label=""
                type="text"
                name="designation"
                register={register}
                error={errors.designation}
                defaultValue=""
                required
                placeholder="Enter your designation"
            
              />
            </div>
            
            <div>
            <FormFieldInput
                label=""
                type="password"
                name="password"
                register={register}
                error={errors.name}
                defaultValue=""
                required
                placeholder="Enter Password"
             
              />
            </div>
            {/* <div>
              <FormFieldPassword
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
                defaultValue=""
                required
                placeholder="Confirm your password"
                isConfirmPassword={true}
                confirmValue={password}
              />
            </div> */}
            <div className="col-span-1">
            <div>
              <SelectComponent
                label=""
                name="role"
                options={SuperUserChildren}
                register={register}
                errors={errors}
                defaultValue=""
                placeholder="Select Role"
              />
            </div>
            </div>
          </div>
          <div className="w-full  text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 uppercase to-blue-700 text-white py-3 px-6 rounded-lg w-60 hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
