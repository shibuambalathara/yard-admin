"use client";
import {
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { AccountStatus, vehicleStatus } from "@/utils/staticData";
import { useRouter } from "next/navigation";
import { comment } from "postcss";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
  comment: string;
  FRONT_IMAGE: File[] | null;
  BACK_IMAGE: File[] | null;
  RIGHT_IMAGE: File[] | null;
  LEFT_IMAGE: File[] | null;
  ODOMETER_IMAGE: File[] | null;
  INTERIOR_IMAGE: File[] | null;
  OTHER_IMAGE: File[] | null;
};

const EditVehicleOwnership = ({ ownershipId }) => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [images, setImages] = useState<Record<string, ImageType[]>>({});
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);

  console.log(ownershipId);
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
        `/ownership/${ownershipId?.clientLevelvehOwnId}`
      );
      console.log(response);

      const destructuredData = {
        ...response?.data?.res,
        ...response?.data?.res?.vehicle,
        comments: response?.data?.res?.comment,
        ownership_status: response?.data?.res?.status,
        app_entry_date:
          response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        app_exit_date:
          response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        mfg_year: response?.data?.res?.vehicle?.mfg_year?.split("T")[0],
        actual_entry_date:
          response?.data?.res?.vehicle?.actual_entry_date?.split("T")[0],
        actual_exit_date:
          response?.data?.res?.vehicle?.actual_exit_date?.split("T")[0],
        status: response?.data?.res?.vehicle?.status,
      };
      setVehicleImage(response?.data?.res?.vehicle?.vehicle_img);
      reset(destructuredData);

      // Set the isSelectDisabled state based on ownership_status
      setIsSelectDisabled(
        response?.data?.res?.status.toLowerCase() === "pending"
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [ownershipId?.clientLevelvehOwnId]);

  const editVehicle = useCallback(
    async (data: Inputs) => {
      const modifiedData = {
        status: data?.ownership_status,
        comment: data?.comment?.toString(),
      };
      try {
        const response = await axiosInstance.patch(
          `/ownership/status/${ownershipId?.clientLevelvehOwnId}`,
          modifiedData
        );
        console.log("patch", modifiedData);

        toast.success(response?.data?.message);
        router.push("/vehicleOwnershipClientOrg");
        setModalOpen(false); // Close the modal on successful update
      } catch (error) {
        // toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },
    [ownershipId?.clientLevelvehOwnId]
  );

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-2 sm:px-6 lg:px-8">
      <div className="lg:max-w-6xl w-full space-y-8 lg:p-10 p-3 bg-white rounded-xl shadow-lg">
        <h2 className=" text-2xl text-center  font-extrabold text-gray-900">
          Vehicle Ownership Details
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 py-4 px-2">
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
              disabled={true}
              label="Start Condition"
              name="start_condition"
              options={vehicleStatus}
              register={register}
              errors={errors}
              defaultValue=""
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

        <div className="grid md:grid-cols-2 grid-cols-1 gap-2 col-span-3 mt-6 md:px-5">
          {Object.entries(images).map(([imageType, imageList]) => (
            <div
              key={imageType}
              className="border rounded-lg shadow-xl border-black"
            >
              <h2 className="text-center text-lg font-semibold">
                {imageType
                  .replace("_", " ")
                  .toLowerCase()
                  .replace(/\b(\w)/g, (s) => s.toUpperCase())}
              </h2>

              {imageList?.map((image, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center pb-4 mt-3"
                >
                  <img
                    className="rounded-xl mb-2 "
                    src={image.src}
                    alt={`${imageType} ${index}`}
                    style={{ width: "70%" }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
     
      <form onSubmit={handleSubmit(editVehicle)} className="mt-8 space-y-6">
        <div className="md:self-end md:justify-self-end mb-1 flex md:gap-5 gap-3">
          <div className=" w-full text-center md:space-x-8 gap-2   max-md:flex ">
            {!isSelectDisabled && (
              <button
                type="button"
                onClick={() => {
                  window.close();
                }}
                className="bg-red-500 text-white py-2 h-10 md:px-12 rounded hover:bg-red-600 transition duration-200 text-xs"
              >
                Back
              </button>
            )}

            {isSelectDisabled && (
              <>
                <button
                  type="button"
                  onClick={() => {
                    window.close();
                  }}
                  className="bg-red-500 text-white md:py-2 h-10 md:px-12 px-4 rounded hover:bg-red-600 transition duration-200 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleModalOpen}
                  className="bg-blue-500 text-white md:py-2 h-10 md:px-12 px-4 rounded hover:bg-blue-600 transition duration-200 text-xs"
                >
                  Confirm Ownership
                </button>
              </>
            )}
          </div>
          
          {modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 backdrop-blur-sm">
              <div className="bg-white p-4 rounded-lg md:w-full max-w-sm">
                <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
                  <h1 className=" font-semibold text-base  ">
                    Confirm Ownership{" "}
                  </h1>
                </div>

                <div className="flex  flex-col items-center justify-center border px-2 py-6">
                  <div>
                    <SelectComponent
                      label="Ownership Status"
                      name="ownership_status"
                      options={AccountStatus}
                      register={register}
                      errors={errors}
                      defaultValue=""
                    />
                  </div>

                  <InputField
                    placeholder="Eg: It's my vehicle/It's not my vehicle"
                    label="Comment"
                    type="text"
                    name="comment"
                    register={register}
                    errors={errors}
                    pattern
                  />
                </div>

                <div className=" w-full text-center p-1 mt-3  space-x-2">
                  <button
                    type="button"
                    onClick={() => handleModalClose()}
                    className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-green-600 transition duration-200"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </form>
      </div>
    </div>
  );
};

export default EditVehicleOwnership;
