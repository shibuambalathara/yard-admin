"use client";
import {
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
} from "../../../ui/fromFields";
import axiosInstance from "../../../../utils/axios";
import { vehicleStatus } from "../../../../utils/staticData";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ConfirmationModal from "@/components/modals/confirmOwnership/confirmOwnership";

interface ImageData {
  img_type: string;
  img_src: string;
  img_name: string;
}
interface ImageType {
  src: string;
  name: string;
}
type Inputs = {
  yard_id: string;
  cl_org_id: string;
  vehicle_category_id: string;
  loan_number: string;
  req_date: string;
  res_by_ins_id: string;
  res_by_ins_type: string;
  res_by_user_id: string;
  mfg_year: string;
  make: string;
  model: string;
  variant: string;
  colour: string;
  condition: string;
  Start_condition: string;
  reg_number: string;
  eng_number: string;
  chasis_number: string;
  odometer: string;
  board_type: string;
  rc_available: string;
  key_count: string;
  ownership_status: string;
  status: string;
  FRONT_IMAGE: File[] | null;
  BACK_IMAGE: File[] | null;
  RIGHT_IMAGE: File[] | null;
  LEFT_IMAGE: File[] | null;
  ODOMETER_IMAGE: File[] | null;
  INTERIOR_IMAGE: File[] | null;
  OTHER_IMAGE: File[] | null;
};

const InitiateInstockVehicle = ({ instockVehicle }) => {
  // console.log("instockVehicle",instockVehicle);

  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [images, setImages] = useState<Record<string, ImageType[]>>({});
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

  useEffect(() => {
    const categorizedImages = vehicleImage.reduce<Record<string, ImageType[]>>(
      (acc, item) => {
        if (!acc[item.img_type]) {
          acc[item.img_type] = [];
        }
        acc[item.img_type].push({ src: item.img_src, name: item.img_name });
        return acc;
      },
      {}
    );

    setImages(categorizedImages);
  }, [vehicleImage]);

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get(
        `/release/owned_instock_vehicle/${instockVehicle?.instockVehicleId}`
      );
      console.log("individual instockVehicleIreponse", response);

      const destructuredData = {
        ...response?.data?.res,
        ...response?.data?.res?.vehicle,
        ownership_status: response?.data?.res?.status,
        app_entry_date:
          response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        app_exit_date:
          response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        mfg_year: response?.data?.res?.vehicle?.mfg_year.split("T")[0],
        actual_entry_date:
          response?.data?.res?.vehicle?.actual_entry_date?.split("T")[0],
        actual_exit_date:
          response?.data?.res?.vehicle?.actual_exit_date?.split("T")[0],
        status: response?.data?.res?.vehicle?.status,
      };
      setVehicleImage(response?.data?.res?.vehicle?.vehicle_img);
      reset(destructuredData);
      
    } catch (error) {
      toast.error(error?.response?.data?.message);

      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const InitateVehcileRelease = async () => {
    const vehicleReleaseId = instockVehicle?.instockVehicleId;
    const data = {
      vehicle_ownership_id: vehicleReleaseId,
    };
    console.log("data", data);
    if (!vehicleReleaseId) {
      console.log("vehicleReleaseId is undefined or null");
      return;
    }
    try {
      const response = await axiosInstance.post("/release/initiate", data);
      
      router.push("/vehicles/instockVehicles");
      toast.success(response?.data?.message)
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log("error of post mehtod", error);
    }
  };

  const handleInitiateClick = () => {
    setModalOpen(true);
  };

  const handleConfirmRelease = async () => {
    setModalOpen(false);
    await InitateVehcileRelease();
  };

  const handleCancelRelease = () => {
    setModalOpen(false);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
      {modalOpen&&<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
        <ConfirmationModal
          isOpen={modalOpen}
          onCancel={handleCancelRelease}
          onConfirm={handleConfirmRelease}
          text=""
        /></div>}
      
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
         Instock Vehicle Details
        </h2>

       

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center mt-4 py-4">
         
          <InputField
            disabled={true}
            label="Loan Number"
            type="text"
            name="loan_number"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Actual Entry Date"
            type="date"
            name="actual_entry_date"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Actual Exit Date"
            required={false}
            type="date"
            name="actual_exit_date"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Manufacturing Date"
            type="date"
            name="mfg_year"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Make"
            type="text"
            name="make"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Model"
            type="text"
            name="model"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Variant"
            type="text"
            name="variant"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Colour"
            type="text"
            name="colour"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Condition"
            type="text"
            name="condition"
            register={register}
            errors={errors}
            pattern
          />
          <div>
            <SelectComponent
              label="Start Condition"
              name="start_condition"
              options={vehicleStatus}
              register={register}
              errors={errors}
              defaultValue=""
              disabled={true}
            />
          </div>
          <InputField
            disabled={true}
            label="Register Number"
            type="text"
            name="reg_number"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Engine Number"
            type="text"
            name="eng_number"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Chassis Number"
            type="text"
            name="chasis_number"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Odometer"
            type="text"
            name="odometer"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Board Type"
            type="text"
            name="board_type"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="RC Available"
            type="text"
            name="rc_available"
            register={register}
            errors={errors}
            pattern
          />
          <InputField
            disabled={true}
            label="Key Count"
            type="text"
            name="key_count"
            register={register}
            errors={errors}
            pattern
          />
        </div>
        
            
        <div className="grid grid-cols-2 gap-2 col-span-3 mt-6 px-5">
        <h2 className="text-center text-2xl font-semibold text-gray-900 mt-12 mb-6 col-span-2">
          Vehicle Images
        </h2>
          {Object.entries(images).map(([imageType, imageList]) => (
            <div
              key={imageType}
              className="border rounded-lg shadow-xl border-black text-center"
            >
              
              <h2 className="rounded-xl mb-2 text-lg ">
                {imageType
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
                
              </h2>
              {imageList?.map((image, index) => (
                <div
                  key={index}
                  className="flex justify-center pb-4 items-center"
                >
                  <img
                    className="rounded-xl"
                    src={image.src}
                    alt={`${imageType} ${index}`}
                    style={{ width: "70%" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="w-full  flex justify-center gap-5">
         <button
                  type="button"
                  onClick={()=>{
                    window.close()
                  }}
                  className="bg-red-500 text-white py-2 h-10 px-12 rounded hover:bg-red-600 transition duration-200"
                >
                  Cancel
                </button>
          <button
            onClick={handleInitiateClick}
            className="border py-2 px-6 text-white bg-blue-500 h-10 rounded-md shadow-lg hover:bg-blue-600 "
          >
            Initiate  Release
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default InitiateInstockVehicle;
