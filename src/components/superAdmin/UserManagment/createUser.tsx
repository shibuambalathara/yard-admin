"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType } from "../../../utils/staticData";
import {
  FormFieldInput,
  InputField,
  SelectComponent,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
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

  const onSubmit = useCallback(async (data: Inputs) => {
    console.log("data", data);

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
      reset();
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
      console.log("error", error);
    }

    // Handle form submission
  }, []);

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-full  border justify-center items-center h-">
      <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b  pb-1">
        <h1 className=" font-bold  ">Create User</h1>
        {/* <p className=" cursor-pointer" onClick={onClose}>x</p> */}
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="  border-gray-200  w-full h-custom overflow-scroll scrollbar-hide"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-2 justify-center place-items-center p-2 border ">
          <div className="mb-">
            <InputField
              label="Name"
              type="text"
              name="name"
              register={register}
              pattern=""
              errors={errors}
            />
          </div>
          <div className="w">
            <InputField
              name="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
              pattern={/^\S+@\S+$/i} // Add pattern validation
            />
          </div>
          <div className="mb-">
            <InputField
              name="contact"
              label="Contact"
              type="text"
              register={register}
              errors={errors}
              pattern={/^\d{10}$/}
            />
          </div>

          <div className="mb-">
            {/* <label htmlFor="mySelect" className={labelStyle.data}>
              Select an Role:
            </label>
            <select
              id="mySelect"
              {...register("role", { required: true })}
              className={`${inputStyle.data}`}
            >
              <option value="">--Please choose an option--</option>
              {Role?.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.role && <p className="text-red-500">Role Required</p>} */}
            <SelectComponent
              label="Select a Role"
              name="role"
              options={Role}
              register={register}
              errors={errors}
              required={true}
            />
          </div>
          <div className="mb-">
            <InputField
              label="Designation"
              type="text"
              name="designation"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="mb-">
            <InputField
              label="Password"
              type="password"
              name="password"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="mb-">
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
          <div className="mb-">
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
          <div className="mb-">
            <InputField
              label="Document Name"
              type="text"
              name="document_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="mb-">
            {/* <div className="mb-4">
              <label htmlFor="mySelect" className={labelStyle.data}>
                Select an Document type:
              </label>
              <select
                id="mySelect"
                {...register("document_type", { required: true })}
                className={`${inputStyle.data}`}
              >
                <option value="">--Please choose an option--</option>
                {DocumentType?.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p className="text-red-500">Document type Required</p>
              )}
        
            </div> */}
            <SelectComponent
              label="Select a Document Type"
              name="document_type"
              options={DocumentType}
              register={register}
              errors={errors}
              required={true}
            />
          </div>
          <div className="">
            <label className="block font-bold mb-2" htmlFor="document_value">
              Document Value
            </label>
            <input
              id="document_value"
              type="file"
              className="py-1 px-12 border border-gray-300 rounded"
              {...register("document_value", { required: true })}
            />
            {errors.document_value && (
              <p className="text-red-500">Document Value is required</p>
            )}
          </div>
        </div>

        <div className=" w-full text-center p-1 mt-3">
          <button
            disabled={!isDirty}
            type="submit"
            className="bg-blue-500 text-white py-2 px-10 w-40 rounded hover:bg-blue-600 transition duration-200"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default CreateUser;
