"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import FileUploadInput, {
  InputField,
  SelectChange,
  SelectComponent,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import VehicleImageGrid from "@/components/reuseableComponent/imageGrid/imageGrid";
import ImageUpload from "@/components/reuseableComponent/imageUpload/imageUpload";
import { Cities } from "@/utils/cities";

type Inputs = {
  captured_city: string;
  captured_state: string;
  captured_images: string[];
};

const IndividualStatuss = (props) => {
  const { vehicleId, user, disable } = props;
  const [vehicleImage, setVehicleImage] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [responseStatus, setResponseStatus] = useState("");
  const [capturedImages, setCapturedImages] = useState(null);
  const [images, setImages] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [selectState, setSelectState] = useState("");
  const [filtercitys, setFiltercitys] = useState([]);
 console.log(selectState);
 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  const fetchVehicle = useCallback(async () => {
    try {
      setIsLoading(true);

      const endpoint = `/repossession/repo_veh_req/${vehicleId?.vehId}`;
      const response = await axiosInstance.get(endpoint);
      console.log(response);

      setResponseStatus(response?.data?.res?.repo_vehicle?.status);
      const destructuredData = {
        user: response?.data?.res?.req_by_user_org?.user?.name,
        org_name: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        initial_city: response?.data?.res?.initial_city,
        // captured_city: response?.data?.res?.captured_city,
        initial_state: response?.data?.res?.initial_state,
        captured_state: response?.data?.res?.captured_state,
        ...response?.data?.res,
      };
      setSelectState(response?.data?.res?.captured_state)
      setVehicleImage(response?.data?.res?.initial_images);
      setCapturedImages(response?.data?.res?.captured_images);
      reset(destructuredData);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, vehicleId, reset]);

  const RepoReAssignment = async (data: Inputs) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      const modifiedData = {
        captured_city: data.captured_city,
        captured_state: data.captured_state,
      };

      // Append modified data to formData
      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }

      // If vehicleImage array is empty, append an empty array
      if (capturedImages.length === 0) {
        formData.append("captured_images", JSON.stringify([])); // You can use `null` or `"[]"` based on API expectations
      } else {
        capturedImages.forEach((image, index) => {
          formData.append(`captured_images[${index}]`, image);
        });
      }

      // Append files from images array
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

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  const handleImageDelete = (url) => {
    const updatedImages = capturedImages.filter((image) => image !== url);
    setCapturedImages(updatedImages);
    setValue("captured_images", updatedImages); // Update the form value
  };

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
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);
    setValue("captured_city", "");
  };

  



  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Captured Details
        </h2>

        <form onSubmit={handleSubmit(RepoReAssignment)} className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {user !== "client" && (
              <InputField
                label="Organization Name"
                type="text"
                name="org_name"
                register={register}
                errors={errors}
                pattern
                disabled={true}
              />
            )}
            <InputField
              label="Registration Number"
              type="text"
              name="reg_number"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <InputField
              label="Initial City"
              type="text"
              name="initial_city"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <InputField
              label="Initial State"
              type="text"
              name="initial_state"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
            <InputField
              label="Status"
              type="text"
              name="status"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />

          
              <>
                <SelectChange
                  label="Captured State"
                  name="captured_state"
                  options={uniqueStates}
                  register={register}
                  errors={errors}
                  required={true}
                  handleChange={handleStateChange}
                  disabled={responseStatus !== "ONGOING"}
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
                    disabled={responseStatus !== "ONGOING"}
                    defaultValue=""
                  />
                
              </>
           
          </div>

          <h2 className="text-lg font-semibold mt-4 underline">
            Initial Images
          </h2>

          <VehicleImageGrid vehicleImages={vehicleImage} />

          <h2 className="text-lg font-semibold mt-4 underline">
            Captured Images
          </h2>
          <VehicleImageGrid
            vehicleImages={capturedImages}
            {...(responseStatus === "ONGOING" && {
              onImageDelete: handleImageDelete,
            })}
          />
          {responseStatus === "ONGOING" ? (
            <>
              <ImageUpload images={images} setImages={setImages} />
              <div className="w-full text-center p-1 mt-3 space-x-2">
              <button
            type="button"
            onClick={() => window.close()}
            className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
          >
            CANCEL
          </button>
                <button className="bg-green-500 text-white py-2 px-8 w-32 rounded hover:bg-green-600 transition duration-200">
                  SUBMIT
                </button>
              </div>
            </>
          ):(
            <div className="w-full text-center p-1 mt-3 space-x-2">
              <button
            type="button"
            onClick={() => window.close()}
            className="bg-red-500 text-white py-2 px-8 w-32 rounded hover:bg-red-600 transition duration-200"
          >
            BACK
          </button>
            </div>
            
          )}
        </form>
      </div>
    </div>
  );
};

export default IndividualStatuss;
