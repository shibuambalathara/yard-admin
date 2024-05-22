"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormFieldInput, SelectInput, ImageMaping } from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import Link from "next/link";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import img4 from "../../../../public/aadhar.jpg";
import Image from "next/image";
import { Role, DocumentType } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
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
};
const images = [img1, img2, img3]; // Array containing imported images

const ViewFullUserProfile = ({ profileId }) => {
  const [initialData, setInitialData] = useState<Inputs | null>(null); // Store initial values

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const watchedFields = watch(); // Watch all fields

  const FetchUserDate = async () => {
    try {
      const response = await axiosInstance.get(
        `http://13.232.152.20/api/v1/yms/user/${profileId.profileId}`
      );

      // console.log("response", response);

      const resetData = {
        ...response?.data?.data,
        document_value: response?.data?.data?.documents.document_value,

        document_type: response?.data?.data?.documents.document_type,
        account_usage_from:
          response?.data?.data?.account_usage_from.split("T")[0], // Extract only the date part
        account_usage_to: response?.data?.data?.account_usage_to.split("T")[0], // Extract only the date part
      };

      setInitialData(resetData); // Store the initial data
      reset(resetData);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [profileId]);

  const onSubmit = async (data: Inputs) => {
    console.log("Data on submit:", data);

  const modifiedData={
    ...data,
    name:data?.name.toUpperCase()
  }
    
    try {
      const editedData: Partial<Inputs> = {};
      if (initialData) {
        for (const field in data) {
          if (modifiedData[field] !== initialData[field]) {
            editedData[field] = modifiedData[field];
            // console.log("editing loop", editedData[field]);
          }
        }
      }

      

       
        // console.log("Edited data:", DataToSumbit);

      // Perform the update API call here with editedData
      const response = await axiosInstance.put(`/user/${profileId.profileId}`, editedData);
      console.log("response of updating user",response);
      
    } catch (error) {
      console.error("Error updating user data", error);
    }
  };

  // console.log("intial data", initialData);


  return (
    <div className="   w-full p-6 ">
      <h1 className="w-full uppercase border text-center text-lg font-semibold">
        Profile{" "}
      </h1>
      <div className="  w-full h-custom border  overflow-scroll scrollbar-hide ">
        <form onSubmit={handleSubmit(onSubmit)} className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-2 gap-6 justify-center place-items-center p-2 border ">
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
            <div className="mb- h-auto">
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
            {/* <div className="mb-2 ">
              <label className="block font-bold mb-2" htmlFor="document_value">
                Document Value
              </label>
              <input
                id="document_value"
                type="file"
                className="py-1 px-12 border border-gray-300 rounded"
                // className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                {...register("document_value", )}
              />
              {errors.document_value && (
                <p className="text-red-500">Document Value is required</p>
              )}
              <div className="border w-full">
                <div className="w-full p-1">
                  <Image
                    src={img1}
                    alt="description"
                    width={380}
                    height={150}
                  />
                </div>
              </div>
            </div> */}
          </div>

          <div className=" w-full text-center p-1 mt-3">
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-10 w-40 rounded hover:bg-red-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewFullUserProfile;
