"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType,SuperUserChildren } from "../../../utils/staticData";
import {
  FormFieldInput,
  InputField,
  SelectComponent,
  FileUploadInput
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { inputStyle, labelStyle, loginInputStyle } from "@/components/ui/style";

const CreateUser = () => {
  type Inputs = {
    name: string;
    email: string;
    contact: number;
    designation: string;
    role:
      | "SUPER_ADMIN"
      | "CLIENT_LEVEL_SUPER_USER" 
      | "CLIENT_LEVEL_USER"
      | "CLIENT_LEVEL_SUB_USER"
      | "YARD_MANAGER";
    aadhar: string;
    accountValidFrom: string;
    password: string;
    account_usage_from: string;
    account_usage_to: string;
    document_type: string;
    document_value: string;
    document_name: string;
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting, isValid },
  } = useForm<Inputs>();

  const router=useRouter()
  const onSubmit = useCallback(async (data: Inputs) => {
    console.log("data from createUser", data);

    const validFrom = new Date(data?.account_usage_from).toISOString();
    const validTo = new Date(data?.account_usage_to).toISOString();
    const fileList = data?.document_value[0]; // Assuming document_value is the FileList object
    const file = fileList[0]; // Get the first file in the FileList
    const fileName = "dummy file";
    console.log("document value", fileName);
    console.log("document value00", typeof fileName);

    // const fileName = file?.name;

    const modifiedData = {
      ...data,

      name: data?.name.toUpperCase(),
      contact: `+91${data?.contact}`,
      account_usage_from: validFrom,
      account_usage_to: validTo,
      document_value: "dummy file name",
    };

    console.log("data from modal", data);

    try {
      const response = await axiosInstance.post(
        "user/create/active_user",
        modifiedData
      );
      console.log("response", response);
      toast.success(response?.data?.message || "success");
      router.push("/userManagement")
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log("error", error);
    }

    // Handle form submission
  }, []);

  const close=()=>{
    router.back()
  }

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Create User</h1>
        {/* <p className="cursor-pointer text-gray-500" onClick={onClose}>x</p> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
            <InputField
              label="Name"
              type="text"
              name="name"
              register={register}
              pattern=""
              errors={errors}
            />
          </div>
          <div className="col-span-1">
            <InputField
              name="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              pattern={/^\S+@\S+$/i}
            />
          </div>
          <div className="col-span-1">
            <InputField
              name="contact"
              label="Contact"
              type="text"
              register={register}
              errors={errors}
              pattern={/^\d{10}$/}
            />
          </div>
          <div className="col-span-1">
            <SelectComponent
              label="Select a Role"
              name="role"
              options={Role}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
            />
          </div>
          <div className="col-span-1">
            <InputField
              label="Designation"
              type="text"
              name="designation"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="col-span-1">
            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="col-span-1">
            <FormFieldInput
              label="Account Valid From"
              type="date"
              name="account_usage_from"
              register={register}
              error={errors.account_usage_from}
              required
              placeholder=""
              defaultValue=""
            />
          </div>
          <div className="col-span-1">
            <FormFieldInput
              label="Account Valid To"
              type="date"
              name="account_usage_to"
              register={register}
              error={errors.account_usage_to}
              required
              placeholder="Select account valid to date"
              defaultValue=""
            />
          </div>
          <div className="col-span-1">
            <InputField
              label="Document Name"
              type="text"
              name="document_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="col-span-1">
            <SelectComponent
              label="Select a Document Type"
              name="document_type"
              options={DocumentType}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
            />
          </div>
          <div className="col-span-2 w-72">
            <label className="block font-bold mb-2" htmlFor="document_value">
              Document Value
            </label>
            <input
              id="document_value"
              type="file"
              className="py-2 px-4 border border-gray-300 rounded-lg w-full"
              {...register("document_value", { required: true })}
            />
            {errors.document_value && (
              <p className="text-red-500">Document Value is required</p>
            )}
          </div>
           {/* <FileUploadInput
                label=" Document Values"
                name="document_value" 
                register={register}
                accept="image/*"
                
              /> */}
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
    // </div>
  );
};

export default CreateUser;
