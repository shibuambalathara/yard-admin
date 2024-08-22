"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  InputField,
  SelectChange,
  SelectComponent,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import Image from "next/image";
import { Cities } from "@/utils/cities";
import { CiCirclePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
import ImageUpload from "../imageUpload/imageUpload";
import VehicleImageGrid from "../imageGrid/imageGrid";
import Link from "next/link";

type Inputs = {
  repo_vehicle: {
    org_name: string;
    code: string;
    reg_number: string;
  };
  cl_org: string;
  end_date: string;
  initial_city: string;
  initial_state: string;
  initial_images: string[];
};

type ImageType = string;

const IndividualStatuss = (props) => {
  const { vehicleId, user, disable ,heading} = props;
  const [vehicleImage, setVehicleImage] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [captured, setCaptured] = useState(null);

  const [responseStatus, setResponseStatus] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [filtercitys, setFiltercitys] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [selectState, setSelectState] = useState("");
  const [images, setImages] = useState([]);
  console.log(vehicleId);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    // Extract unique state names from Cities array
    const uniqueStates = Cities?.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);

    setUniqueStates(uniqueStates);
  }, []);

  useEffect(() => {
    if (selectState) {
      const stateData = Cities.filter((state) => state.state === selectState);
      setFiltercitys(stateData?.map((value) => value?.city));
    }
  }, [selectState]);

  const onClose = () => {
    window.close();
  };

  const fetchVehicle = useCallback(async () => {
    try {
      setIsLoading(true);

      const endpoint = `/repossession/repo_veh_req/${vehicleId?.vehId}`;
      const response = await axiosInstance.get(endpoint);
      setResponseStatus(response?.data?.res?.status);
      const destructuredData = {
        ...response?.data?.res,
        cl_org: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        org_name: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        initial_city: response?.data?.res?.initial_city,
        initial_state: response?.data?.res?.initial_state,
        end_date: response?.data?.res?.end_date?.slice(0, 16),
      };
      console.log(response);
      setSelectState(destructuredData?.initial_state);
      setVehicleImage(response?.data?.res?.initial_images);
      setCaptured(response?.data?.res?.is_captured)
      reset({
        ...destructuredData,
        initial_images: response?.data?.res?.initial_images,
      });
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
      // Optionally, display an error message to the user
    } finally {
      setIsLoading(false);
    }
  }, [user, vehicleId, reset, setVehicleImage, setIsLoading]);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const RepoReAssignment = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const modifiedData = {
        initial_city: data.initial_city,
        initial_state: data.initial_state,
        // initial_images:[vehicleImage], // Use the updated vehicleImage array
      };

      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }
      vehicleImage.forEach((image, index) => {
        formData.append(`initial_images[${index}]`, image);
      });
      // formData.append("repo_vehicle_id", vehicleId?.vehId);
      // formData.append("initial_state", data.initial_state);
      // formData.append("initial_city", data.initial_city);
      // formData.append("reason", data.reason);

      images.forEach((image) => {
        formData.append("files", image);
      });

      console.log(modifiedData);
      const response = await axiosInstance.patch(
        `repossession/repo_veh_req/update_request_repossession/${vehicleId?.vehId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response);
      toast.success(response?.data?.message);
      fetchVehicle();
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
      setImages([]);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);

    setValue("initial_city", "");
  };

  const handleImageDelete = (url) => {
    const updatedImages = vehicleImage.filter((image) => image !== url);
    setVehicleImage(updatedImages);
    setValue("initial_images", updatedImages); // Update the form value
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImages([...images, file]);
    }
  };

  
  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          {heading}
        </h2>

        <form onSubmit={handleSubmit(RepoReAssignment)} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              label="Organization Name"
              type="text"
              name="cl_org"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            {user !== "client" && (
              <InputField
                label="Org Name"
                type="text"
                name="org_name"
                register={register}
                errors={errors}
                pattern
                disabled={true}
              />
            )}

            <InputField
              label="Code"
              type="text"
              name="code"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <SelectChange
              label="State"
              name="initial_state"
              options={uniqueStates}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              handleChange={handleStateChange}
              disabled={responseStatus !== "REPOSSESSION_REQUESTED"}
            />
            <SelectComponent
              label="City"
              name="initial_city"
              options={filtercitys.map((city) => ({
                value: city,
                label: city,
              }))}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              disabled={responseStatus !== "REPOSSESSION_REQUESTED"}
            />
            {/* {responseStatus === "REPOSSESSION_APPROVED" && (
              <InputField
                label="End Date & Time"
                type="datetime-local"
                name="end_date"
                register={register}
                errors={errors}
                pattern
                disabled={true}
              />
            )} */}
          </div>
          <div>
          <h1 className="block text-gray-700 text-sm font-bold mb-2">
        Images
      </h1>

      <VehicleImageGrid
  vehicleImages={vehicleImage}
  {...(responseStatus === "REPOSSESSION_REQUESTED" && { onImageDelete: handleImageDelete })}
/>
          </div>
          
           { responseStatus === "REPOSSESSION_REQUESTED"&&
           ( <ImageUpload images={images} setImages={setImages} />)
         }

          <div className="w-full text-center p-1 mt-16 space-x-2">

           {responseStatus === "REPOSSESSION_REJECTED"&&(<button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              BACK
            </button>)}
            {responseStatus === "REPOSSESSION_APPROVED" &&!captured&&(<><button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              CANCEL
            </button> <Link
        href={`/approvedRepoVehicle/${vehicleId?.vehId}/completed`}
        className="bg-blue-500 text-white py-2 px-8 w-32 rounded hover:bg-blue-600 transition duration-200 "
      >
        COMPLETE
      </Link></>)}
           
            {responseStatus === "REPOSSESSION_REQUESTED" && (<>
              <button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              CANCEL
            </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200"
              >
                SUBMIT
              </button>
              </> )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualStatuss;
