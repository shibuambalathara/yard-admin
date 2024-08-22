"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import {
  FormFieldInput,
  SelectComponent,
  FileUploadInput
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { fetchChildren } from "@/utils/commonApi/commonApi";
// Import your fetch function

type Inputs = {
  name: string;
  email: string;
  contact: number;
  designation: string;
  role: string;
  password: string;
  org_id: string;
  user_doc: FileList;
};

const CreateUser = () => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [orgOptions, setOrgOptions] = useState([]); // State for org options
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    const fetchOrgOptions = async () => {
      const options = await fetchChildren(); // Fetch org options
      setOrgOptions(options || []); // Set options in state
    };

    fetchOrgOptions();

    if (success) {
      setTimeout(() => {
        setSuccess(null);
      }, 2000);
    }
    if (error) {
      toast.error(
        error?.text || "Something went wrong. Please contact support"
      );
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [success, error]);

  const CreateUser = async (data: Inputs) => {
    try {
      const payload = {
        name: data.name.toUpperCase(),
        email: data.email,
        contact: `+91${data.contact}`,
        designation: data.designation,
        role: "CLIENT_LEVEL_USER",
        password: data.password,
        org_id: data.org_id,
      };

      const response = await axiosInstance.post("/user/client_lvl_org", payload);
      toast.success(response?.data?.message);
      router.push("/userCreation");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.response?.data?.message);
    }
  };

  const close = () => {
    router.back();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full h-fit bg-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-700">Create User</h1>
        </div>
        <form onSubmit={handleSubmit(CreateUser)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                error={errors.password}
                defaultValue=""
                required
                placeholder=""
              />
            </div>
            <div className="col-span-1">
              <SelectComponent
                label="Select Organization"
                name="org_id"
                options={orgOptions} // Use the fetched options here
                register={register}
                errors={errors}
                defaultValue=""
                required={true}
                placeholder="Select organization"
              />
            </div>
            <div className="col-span-1">
              <FileUploadInput
                label="Upload User Document"
                name="user_doc"
                register={register}
               
                accept="image/*"
              />
            </div>
          </div>
          <div className="w-full text-center pt-4 space-x-4">
            <button
              type="button"
              onClick={close}
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

export default CreateUser;
