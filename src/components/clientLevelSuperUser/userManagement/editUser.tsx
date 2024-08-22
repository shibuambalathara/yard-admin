"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  SelectComponent,
} from "../../ui/fromFields";
import Loading from "@/app/(home)/(superAdmin)/loading";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { SuperUserChildren } from "@/utils/staticData";

type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
};

const EditIndividualUser = ({ userId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [initialData, setInitialData] = useState<Inputs | null>(null); // Store initial values
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const router = useRouter();

  useEffect(() => {
    if (success) {
      toast.success(success.text || "Success");
      setTimeout(() => {
        setSuccess(null);
        router.push("/userCreation");
      }, 2000);
    }
    if (error) {
      toast.error(
        error.text || "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchUserDate = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `/user/client_lvl_org/${userId?.userId}`
      );

      console.log("userData", response);

      const user = response?.data?.res?.user;

      if (user) {
        const phoneNumber = user.contact.slice(3);
        const resetData = {
          name: user.name,
          email: user.email,
          contact: parseInt(phoneNumber, 10),
          designation: user.designation,
          role: user.role,
        };

        setInitialData(resetData); // Store the initial data
        reset(resetData);
      }
    } catch (error) {
      console.error("Error fetching user data", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserDate();
  }, [userId]);

  const EditUser = async (data: Inputs) => {
    console.log("Entered in user update", data);

    const modifiedData = {
      ...data,
      contact: `+91${data.contact}`,
    };

    console.log("modifiedData", modifiedData);

    try {
      const response = await axiosInstance.patch(
        `/user/client_lvl_org/${userId?.userId}`,
        modifiedData
      );
      console.log("Response of updating user", response);
      setSuccess(response.data.message);
    } catch (error) {
      console.error("Error updating user data", error);
      setError(error?.response?.data?.message);
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
    <div className="bg-gray-100 min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white h-fit p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Update User</h1>
        </div>
        <form onSubmit={handleSubmit(EditUser)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
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
            <div className="col-span-1">
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
            <div className="col-span-1">
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
            <div className="col-span-1">
              <SelectComponent
                label="Role"
                options={SuperUserChildren}
                name="role"
                register={register}
                errors={errors}
                required
                disabled={true}
                defaultValue=""
              />
            </div>
            <div className="col-span-1">
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
          <div className="w-full text-center pt-4 space-x-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="bg-red-500 text-white py-2 px-10 rounded-md hover:bg-red-600 transition duration-200"
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

export default EditIndividualUser;
