"use client";
import { InputField, SelectComponent } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { getUserProfile, updateUserProfile } from "@/utils/commonApi/commonApi";
import { Role, DocumentType } from "@/utils/staticData";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useAuthStore from "@/store/useAuthStore";

type Document = {
  title: string;
  content: string;
};

type User = {
    code: string;
    contact: string;
    designation: string;
    document?: Document[];
    email: string;
    id: string;
    name: string;
  };
  

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<User>();
  const { token, role, setUser: setStoreUser } = useAuthStore();


  console.log("userRole",role);
  

  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile();
        console.log("profile response", response);
        setUser(response);
        const phoneNumber = "+918089688206";
const cleanedPhoneNumber = response?.contact?.replace("+91", "");
console.log(cleanedPhoneNumber);
const modifiedData={
    ...response,
    contact:cleanedPhoneNumber
}
        reset(modifiedData);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchUserProfile();
  }, []);

  console.log("user", user);

  const toggleDisabled = () => {
    setIsDisabled(!isDisabled);
  };
  const Back = () => {
    router.push("");
  };

  const UpdateUserProfile = async (data: User) => {
    try {
        const modifiedData={
            ...data,
            contact:`+91${data?.contact}`
        }
      const response = await updateUserProfile(modifiedData);
    //   setStoreUser(modifiedData); // Update the user in the store

      console.log("update response", response);
      toast.success(response?.data?.message)
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  };
  const isDocumentUpdateAllowed = role === "YARD_MANAGER" || role === "CLIENT_LEVEL_USER";

  return (
    <div className="bg-gray-100 min-h-screen flex  justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg h-form-Modal">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold text-gray-700">
              Update User profile
            </h1>
          </div>
          <div
            onClick={() => toggleDisabled()}
            className=" flex items-center  bg-blue-500 text-white py-2 px-4 space-x-2  rounded-md hover:bg-blue-600 transition duration-200"
          >
            <button
              type="button"

              //   className="bg-blue-500 text-white py-2 px-10  rounded-md hover:bg-blue-600 transition duration-200"
            >
              Edit
            </button>
            <FaEdit className="text-base" />
          </div>
        </div>
        <form onSubmit={handleSubmit(UpdateUserProfile)} className="space-y-6">
          <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-1">
              <InputField
                label="Name"
                type="text"
                name="name"
                register={register}
                pattern=""
                errors={errors}
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
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
                disabled={isDisabled}
              />
            </div>
            {/* <div className="col-span-1">
              <InputField
                label="Password"
                type="password"
                name="password"
                register={register}
                errors={errors}
                pattern=""
              />
            </div> */}

{/* {isDocumentUpdateAllowed && (
              <>
                <div className="col-span-1">
                  <InputField
                    label="Document Title"
                    type="text"
                    name="documentTitle"
                    register={register}
                    errors={errors}
                    pattern=""
                    disabled={isDisabled}
                  />
                </div>
                <div className="col-span-1">
                  <SelectComponent
                    label="Select a Document Type"
                    name="documentType"
                    options={DocumentType}
                    register={register}
                    errors={errors}
                    required={true}
                    defaultValue=""
                    disabled={isDisabled}
                  />
                </div>
              </>
            )} */}
            {/* <div className="col-span-2 w-72 space-y-1">
            <label className="block  font-semibold " htmlFor="document_value">
              Document Value
            </label>
            <input
              id="document_value"
              type="file"
              className="py-1 px-4 border border-gray-300  w-full"
              {...register("document_value", { required: true })}
            />
            {errors.document_value && (
              <p className="text-red-500">Document Value is required</p>
            )}
          </div> */}
            {/* <FileUploadInput
                label=" Document Values"
                name="document_value" 
                register={register}
                accept="image/*"
                
              /> */}
          </div>
          <div className="w-full text-center pt-4 space-x-4 ">
            {isDisabled ? (
              <button
                type="button"
                onClick={Back}
                className="bg-red-500 text-white py-2 px-10  rounded-md hover:bg-red-600 transition duration-200"
              >
                Back
              </button>
            ) : (
              <div className="space-x-2">
                <button
                  onClick={() => toggleDisabled()}
                  type="submit"
                  className="bg-red-600 text-white py-2 px-10 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white py-2 px-10 rounded-md hover:bg-green-700 transition duration-200"
                >
                  Submit
                </button>
              </div>
            )}

            {/* {!isDisabled && (
                
                
        )} */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
