"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  FormFieldInput,
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
  SelectInput,
  TextArea,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { vehicleStatus } from "@/utils/staticData";
import Image from "next/image";
import Link from "next/link";

type Inputs = {
  cl_org: string;
  org_name: string;
  code: string;
  reg_number: string;
  initial_city: string;
  initial_state: string;
};

type FileInputs = {
  [key: string]: FileList;
};

const IndividualStatuss = ({ vehicleId }) => {
  const [vehicleImage, setVehicleImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  const [uploadImages, setUploadImages] = useState<FileInputs>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState<Record<string, string[]>>(
    {}
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  const fetchVehicle = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(
        `/repossession/repo_veh_req/${vehicleId?.vehId}`
      );

      const destructuredData = {
        cl_org: response?.data?.res?.repo_vehicle?.cl_org?.code,
        org_name: response?.data?.res?.repo_vehicle?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        initial_city: response?.data?.res?.initial_city,
        initial_state: response?.data?.res?.initial_state,
      };

      setVehicleImage(response?.data?.res?.vehicle_img);
      reset(destructuredData);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(data => console.log(data))} className="mt-8 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <InputField
              label="CL Org Code"
              type="text"
              name="cl_org"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Org Name"
              type="text"
              name="org_name"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Code"
              type="text"
              name="code"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Initial City"
              type="text"
              name="initial_city"
              register={register}
              errors={errors}
              pattern
            />
            <InputField
              label="Initial State"
              type="text"
              name="initial_state"
              register={register}
              errors={errors}
              pattern
            />
          </div>

          <div className=" w-full text-center p-1 mt-3  space-x-2">
          <button
            type="button"
            // onClick={() => onClose()}
            className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
          >
            CANCEL
          </button>
          <button
            onClick={handleModalOpen}
            className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
          >SUBMIT
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualStatuss;
