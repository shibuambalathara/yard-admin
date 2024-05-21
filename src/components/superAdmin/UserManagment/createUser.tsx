"use client"
import { useForm } from "react-hook-form";
import { useState,useEffect } from "react";
import { Role, DocumentType } from "../../../utils/staticData";
import { FormFieldInput, SelectInput } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const CreateUser = ({onClose}) => {
const [isLoading,setIsLoading]=useState(false)
const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  type Inputs = {
    name: string;
    email: string;
    contact: number;
    designation: string;
    role: string;
    aadhar: string;
    accountValidFrom: string;
    password: string;
    account_usage_from: string;
    account_usage_to: string;
    document_type: string;
    document_value: string;
    document_name:string
  };
  const {
    register,
    handleSubmit,
    watch,
    reset,
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


  const onSubmit = async(data:Inputs) => {
    console.log('data',data);
    
    const validFrom = new Date(data?.account_usage_from).toISOString();
    const validTo = new Date(data?.account_usage_to).toISOString();
    const fileList = data?.document_value[0]; // Assuming document_value is the FileList object
    const file = fileList[0]; // Get the first file in the FileList
    const fileName = "dummy file"
console.log("document value",fileName);
console.log("document value00",typeof(fileName))


// const fileName = file?.name;

    const modifiedData={
      ...data,

      name:data?.name.toUpperCase(),
      contact:`+91${data?.contact}`,
      account_usage_from:validFrom,
      account_usage_to:validTo,
      document_value:"dummy file name"
    }

    console.log("data from modal",data);

    try {
      const response=await axiosInstance.post('user/create/active_user',modifiedData)
      console.log("response",response);
      setSuccess({
        text: response?.data?.message,
    });
    setTimeout(() => {
      reset(); // Reset the form
      onClose(); // Close the modal
    }, 1000);
      
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.log('error',error);
      
    }
    
    // Handle form submission
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-5xl">
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
       <h1 className=" font-bold  ">Create User</h1>
       <p className=" cursor-pointer" onClick={onClose}>x</p>
       </div>
      <form onSubmit={handleSubmit(onSubmit)} className="  border-gray-200 ">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 justify-center place-items-center p-2 border ">
        <div className="mb-">
          <FormFieldInput
            label="Name"
            type="text"
            name="name"
            register={register}
            error={errors.name}
            required
            defaultValue=""
            placeholder=""
          />
        </div>
        <div className="mb-">
          <FormFieldInput
            label="Email"
            type="email"
            name="email"
            register={register}
            error={errors.email}
            required
            placeholder=""
            defaultValue=""

          />
        </div>
        <div className="mb-">
          <FormFieldInput
            label="Contact"
            type="tel"
            name="contact"
            register={register}
            error={errors.contact}
            required
            placeholder=""
            defaultValue=""

          />
        </div>
        <div className="mb-">
          <SelectInput
            label="Role"
            options={Role}
            name="role"
            register={register}
            error={errors.role}
            required
            placeholder=""
            defaultValue="Select user role"

          />
        </div>
        <div className="mb-">
          <FormFieldInput
            label="Designation"
            type="text"
            name="designation"
            register={register}
            error={errors.designation}
            required
            placeholder=""
            defaultValue=""

          />
        </div>
        <div className="mb-">
          <FormFieldInput
            label="Password"
            type="password"
            name="password"
            register={register}
            error={errors.password}
            required
            placeholder=""
            defaultValue=""

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
          <FormFieldInput
            label="Document Name"
            type="text"
            name="document_name"
            register={register}
            error={errors.account_usage_to}
            required
            placeholder=""
            defaultValue=""

          />
        </div>
        <div className="mb-">
          <SelectInput
            label="Document Type"
            options={DocumentType}
            name="document_type"
            register={register}
            error={errors.document_type}
            required
            placeholder="Select document type"
            defaultValue="Select document type"

          />
        </div>
        <div className="mb-2">
          <label className="block font-bold mb-2" htmlFor="document_value">
            Document Value
          </label>
          <input
            id="document_value"
            type="file"
            className="py-1 px-12 border border-gray-300 rounded"
            {...register("document_value", { required: true })}
          />
          {errors.document_value && <p className="text-red-500">Document Value is required</p>}
        </div>
        </div>
        

       <div className=" w-full text-center p-1 mt-3">
       <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-10 w-40 rounded hover:bg-blue-600 transition duration-200"
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
