"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectInput,
  ImageMaping,
  AccountVerificatioSelect,
  SelectComponent,
} from "../../ui/fromFields";
import { formStyle } from "../../ui/style";
import Link from "next/link";
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import img4 from "../../../../public/aadhar.jpg";
import Image from "next/image";
import { Role, DocumentType, SuperUserChildren } from "@/utils/staticData";
import axiosInstance from "@/utils/axios";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  password: string;
  confirmPassword: string;
};

const EditIndividualUser = ({ userId, onClose,fetchData }) => {
  console.log("userId for edit user", userId);

  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState<Inputs | null>(null); // Store initial values
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner

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
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const watchedFields = watch(); // Watch all fields

  const FetchUserDate = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user/users/created_by_ins/${userId}`
      );
    
     let phoneNumber;
      if (response?.data?.res) {
        let contactNumber = response?.data?.res?.contact;

        phoneNumber = contactNumber?.slice(3);
      }
      const resetData = {
        ...response?.data?.res,
        contact: parseInt(phoneNumber),
      };

      setSuccess({
        text: response?.data?.message,
      });
      setInitialData(resetData); // Store the initial data
      reset(resetData);
    } catch (error) {
      // console.log("resetData", initialData);

      console.log("error", error);
      setError({
        text: error?.response?.data?.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [userId]);

  const onSubmit = async (data: Inputs) => {
    console.log("ENETERED IN USER UPDATE",data);

    const modifiedData = {
      ...data,
      contact: `+91${data?.contact}`,

    };
console.log("modifieddata",modifiedData);

    try {
      const response = await axiosInstance.patch(
        `/user/users/created_by_ins/${userId}`,
        modifiedData
      );
      console.log("response of updating user of client level super user", response);
      toast.success(response?.data?.message);
      // onClose()
      fetchData()
    } catch (error) {
      console.error("Error updating user data", error);
      toast.error(error?.data?.response?.message);
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
    <div className="flex items-center justify-center  ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 relative  ">
        <h1 className="p-2 uppercase text-center">update User</h1>
        {/* <div className=" "> */}
        <button
          className="absolute top-0 p-2 right-3 text-gray-400 hover:text-gray-600 transition duration-200"
          onClick={() => onClose()}
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
        {/* </div> */}

        <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2  h-56 overflow-y-scroll scrollbar-hide">
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
                type="number"
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
                options={SuperUserChildren}
                name="role"
                register={register}
                error={errors}
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
          </div>

          <div className="w-full  text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 uppercase to-blue-700 text-white py-3 px-6 rounded-lg w-60 hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIndividualUser;
