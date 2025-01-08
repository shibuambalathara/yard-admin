"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  FutureDate,
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
import VehicleImageGrid from "../../imageGrid/imageGrid";
import ImageUpload from "../../imageUpload/imageUpload";


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
        end_date: DateConvert(response?.data?.res?.end_date)
      };
      console.log(response);
      setSelectState(destructuredData?.initial_state);
      setVehicleImage(response?.data?.res?.initial_images);
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
  }, [vehicleId,user]);

  const RepoReAssignment = async (data: Inputs) => {
    setIsLoading(true);
    try {
      
      const modifiedData = {
        end_date: data?.end_date ? new Date(data.end_date).toISOString() : null
       
      };

      console.log(modifiedData);
      const response = await axiosInstance.patch(
        `repossession/repo_veh_req/update_approve_repossession/${vehicleId?.vehId}`,
        modifiedData
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
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <form onSubmit={handleSubmit(RepoReAssignment)} className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InputField
              label="Organization Name"
              type="text"
              name="cl_org"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
          
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
              <FutureDate
                label="End Date & Time"
                type="datetime-local"
                name="end_date"
                register={register}
                errors={errors}
                pattern
                
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
            <button
              type="button"
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
            >
              BACK
            </button>
          
              {/* <button
                type="submit"
                className="bg-green-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-green-600 transition duration-200"
              >
                SUBMIT
              </button>
             */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default IndividualStatuss;
export const DateConvert=(date)=>{
  const dateObj = new Date(date);
const year = dateObj.getFullYear();
const month = String(dateObj.getMonth() + 1).padStart(2, '0');
const day = String(dateObj.getDate()).padStart(2, '0');
const hours = String(dateObj.getHours()).padStart(2, '0');
const minutes = String(dateObj.getMinutes()).padStart(2, '0');
const formattedString = `${year}-${month}-${day}T${hours}:${minutes}`;
return formattedString
}