"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";
import { Cities } from "@/utils/cities";
import { CiCirclePlus } from "react-icons/ci";
import { SelectChange } from "../../ui/fromFields";
import ImageUpload from "@/components/reuseableComponent/imageUpload/imageUpload";

type Inputs = {
  repo_vehicle_id: string;
  captured_state: string;
  captured_city: string;
  reason: string;
};

const CompleteRepo = ({ vehicleId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedState, setSelectedState] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]); // Use proper typing for images
  const [imageError, setImageError] = useState<string | null>(null); // New state for image error
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const RepoReq = async (data: Inputs) => {
    if (images.length === 0) {
      // If no images, set an error and prevent submission
      setImageError("Please upload at least one image.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      const modifiedData = {
        ...data,
        status: "REPOSSESSION_COMPLETED"
      };
      for (const key in modifiedData) {
        formData.append(key, modifiedData[key]);
      }
      images.forEach((image) => {
        formData.append("files", image);
      });

      const response = await axiosInstance.patch(
        `repossession/repo_veh_req/complete_repossession/${vehicleId?.vehId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          maxBodyLength: Infinity,
        }
      );

      toast.success(response?.data?.message);
      onClose();
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const stateData = Cities.filter((item) => item.state === selectedState);
    setFilterCity(stateData.map((item) => item.city));
  };

  useEffect(() => {
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);
    setUniqueStates(uniqueStates);
  }, []);

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

  const onClose = () => {
    router.push('/approvedRepoVehicle');
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center border-2 h-full w-full">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-6 p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-center text-2xl font-bold text-gray-900">Provide Details</h2>

        <form className="space-y-6" onSubmit={handleSubmit(RepoReq)} encType="multipart/form-data">
          <div className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <SelectChange
                label="Captured State"
                name="captured_state"
                options={uniqueStates}
                register={register}
                errors={errors}
                required
                defaultValue=""
                handleChange={handleStateChange}
              />
              <SelectChange
                label="Captured City"
                name="captured_city"
                options={filterCity}
                register={register}
                errors={errors}
                required
                defaultValue=""
              />
            </div>

            <ImageUpload images={images} setImages={setImages} />

            {/* Display image error if any */}
            {imageError && <p className="text-red-500 text-sm ">{imageError}</p>}
          </div>

          <div className="text-center space-x-4">
            <button
              onClick={onClose}
              type="button"
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteRepo;
