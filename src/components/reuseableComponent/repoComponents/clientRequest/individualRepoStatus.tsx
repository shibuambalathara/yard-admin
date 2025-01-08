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
import RepoRespond from "../modal/requestRespond";
import { log } from "console";
import VehicleImageGrid from "../../imageGrid/imageGrid";
import RepoClose from "../modal/requestClose";

type Inputs = {
  repo_vehicle: {
    org_name: string;
    code: string;
    reg_number: string;
  };
  user: string;
  initial_city: string;
  initial_state: string;
  status: string;
  req_by_user_org: string;
};

type FileInputs = {
  [key: string]: FileList;
};

const IndividualStatuss = (props) => {
  const { vehicleId, user, disable, heading } = props;
  const [vehicleImage, setVehicleImage] = useState([]);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState("");
  const [responseStatus, setResponseStatus] = useState("");
  const [uploadImages, setUploadImages] = useState<FileInputs>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [isClosed, setIsClosed] = useState(false);
  const [previewImages, setPreviewImages] = useState<Record<string, string[]>>(
    {}
  );
  const [capturedCity, setCapturedCity] = useState<string | null>(null);
  const [capturedState, setCapturedState] = useState<string | null>(null);

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

      setResponseStatus(response?.data?.res?.status);
      setCapturedCity(response?.data?.res?.captured_city || null);
      setCapturedState(response?.data?.res?.captured_state || null);
      setIsClosed(response?.data?.res?.repo_vehicle?.status==="CLOSED")
      const destructuredData = {
        user: response?.data?.res?.req_by_user_org?.user?.name,
        org_name: response?.data?.res?.repo_vehicle?.cl_org?.org_name,
        code: response?.data?.res?.repo_vehicle?.code,
        reg_number: response?.data?.res?.repo_vehicle?.reg_number,
        initial_city: response?.data?.res?.initial_city,
        initial_state: response?.data?.res?.initial_state,
        ...response?.data?.res,
      };
      setVehicleImage(response?.data?.res?.initial_images);
      setCapturedImages(response?.data?.res?.captured_images);
      reset(destructuredData);
    } catch (error) {
      console.error("Error fetching vehicle data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [user, vehicleId, reset]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);
  const handleCancelClick = () => {
    
    setModalOpen(true);
    setSelectedVehicleId(vehicleId?.vehId);
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

  const onClose = () => {
    window.close();
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
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className="text-center md:text-2xl font-extrabold text-gray-900">
          {heading}
        </h2>

        <form onSubmit={handleSubmit((data) => console.log(data))} className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <InputField
              label="Requested User"
              type="text"
              name="user"
              register={register}
              errors={errors}
              pattern
              disabled={true}
            />
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

            {capturedCity && capturedState && (
              <>
                <InputField
                  label="Captured City"
                  type="text"
                  name="captured_city"
                  register={register}
                  errors={errors}
                  pattern
                  disabled={true}
                />
                <InputField
                  label="Captured State"
                  type="text"
                  name="captured_state"
                  register={register}
                  errors={errors}
                  pattern
                  disabled={true}
                />
              </>
            )}
          </div>
          <h2 className="text-lg font-semibold mt-4 underline">Initial Images</h2>

          <VehicleImageGrid vehicleImages={vehicleImage} />

          {capturedImages.length > 0 && (
            <>
              <h2 className="text-lg font-semibold mt-4 underline">Captured Images</h2>
              <VehicleImageGrid vehicleImages={capturedImages} />
            </>
          )}
        </form>

       
          <>
            {modalOpen && (
              <div className="relative border">
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
                  <RepoRespond
                    status={status}
                    onClose={handleModalClose}
                    vehicleId={vehicleId}
                    fetchData={fetchVehicle}
                    user={user}
                  />
                </div>
              </div>
            )}

            <div className="w-full text-center p-1 mt-3 space-x-2">
              <button
                type="button"
                onClick={handleModalReject}
                className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
              >
                REJECT
              </button>
              <button
                onClick={handleModalAccept}
                className="bg-green-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-green-600 transition duration-200"
              >
                ACCEPT
              </button>
            </div>
          </>
        
      </div>
    </div>
  );
};

export default IndividualStatuss;
