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
import ImageUpload from "@/components/reuseableComponent/imageUpload/imageUpload";
import { FaTrashAlt } from "react-icons/fa";
import VehicleImageGrid from "@/components/reuseableComponent/imageGrid/imageGrid";

type Inputs = {
  repo_vehicle: {
    org_name: string;
    code: string;
    reg_number: string;
  };
  cl_org: string;
  end_date: string;
  captured_city: string;
  captured_state: string;
  captured_images: string[];
};

type ImageType = string;

const IndividualCompleted = (props) => {
  const { vehicleId, user, disable } = props;
  const [vehicleImage, setVehicleImage] = useState<ImageType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
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

      const endpoint =
        user === "client"
          ? `/repossession/repo_veh_req/${vehicleId?.repoId}`
          : `/repossession/repo_veh_req/${vehicleId?.vehId}`;
      const response = await axiosInstance.get(endpoint);
      setResponseStatus(response?.data?.res?.status);
      const destructuredData = {
        cl_org: response?.data?.res?.repo_vehicle?.cl_org?.code,
        org_name: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        captured_city: response?.data?.res?.captured_city,
        captured_state: response?.data?.res?.captured_state,
        end_date: response?.data?.res?.end_date?.slice(0, 16),
      };
      console.log(response);
      setSelectState(destructuredData?.captured_state);
      setVehicleImage(response?.data?.res?.captured_images);
      reset({
        ...destructuredData,
        captured_images: response?.data?.res?.captured_images,
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
        captured_city: data.captured_city,
        captured_state: data.captured_state,
        // captured_images:[vehicleImage], // Use the updated vehicleImage array
      };

      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }
      vehicleImage.forEach((image, index) => {
        formData.append(`captured_images[${index}]`, image);
      });
      // formData.append("repo_vehicle_id", vehicleId?.vehId);
      // formData.append("captured_state", data.captured_state);
      // formData.append("captured_city", data.captured_city);
      // formData.append("reason", data.reason);

      images.forEach((image) => {
        formData.append("files", image);
      });

      console.log(modifiedData);
      const response = await axiosInstance.patch(
        `repossession/repo_veh_req/update_complete_repossession/${vehicleId?.vehId}`,
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

    setValue("captured_city", "");
  };

  const handleImageDelete = (url) => {
    const updatedImages = vehicleImage.filter((image) => image !== url);
    setVehicleImage(updatedImages);
    setValue("captured_images", updatedImages); // Update the form value
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

  const handleModalAccept = () => {
    setModalOpen(true);
    setStatus("REPOSSESSION_APPROVED");
  };

  const handleModalReject = () => {
    setModalOpen(true);
    setStatus("REPOSSESSION_REJECTED");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(RepoReAssignment)} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InputField
              label="CL Org Code"
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
              label="Captured State"
              name="captured_state"
              options={uniqueStates}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              handleChange={handleStateChange}
              //   disabled={responseStatus !== "REPOSSESSION_REQUESTED"}
            />
            <SelectComponent
              label="Captured City"
              name="captured_city"
              options={filtercitys.map((city) => ({
                value: city,
                label: city,
              }))}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              //   disabled={responseStatus !== "REPOSSESSION_REQUESTED"}
            />
            {responseStatus === "REPOSSESSION_APPROVED" && (
              <InputField
                label="End Date & Time"
                type="datetime-local"
                name="end_date"
                register={register}
                errors={errors}
                pattern
                disabled={true}
              />
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900">Images</h3>

            {/* {vehicleImage.map((url, index) => (
                <div key={index} className="relative">

                  <Image
                    src={url}
                    alt={`Vehicle Image ${index + 1}`}
                    width={300}
                    height={200}
                    className="rounded-lg"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                    onClick={() => handleImageDelete(url)}
                  >
                    X
                  </button>
                </div>
              ))}  */}

            <VehicleImageGrid
              vehicleImages={vehicleImage}
              onImageDelete={handleImageDelete}
            />
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {vehicleImage.map((url, index)=> (
        <div key={index} className="group cursor-pointer relative">
         <Image
                    src={url}
                    alt={`Vehicle Image ${index + 1}`}
                    width={300}
                    height={200}
            className="w-full h-48 object-cover rounded-lg transition-transform transform scale-100 group-hover:scale-105"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100   
 transition-opacity">
            <button type="button" onClick={() => handleImageDelete(url)} className="bg-white text-gray-800   
 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
            <FaTrashAlt className="text-red-500" />
            </button>
          </div>
        </div>
      ))}
  
            </div> */}
          </div>
          <ImageUpload images={images} setImages={setImages} />

          <div className="w-full text-center p-1 mt-16 space-x-2">
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              CANCEL
            </button>
            {responseStatus === "REPOSSESSION_COMPLETED" && (
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200"
              >
                SUBMIT
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualCompleted;
