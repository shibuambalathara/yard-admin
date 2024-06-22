"use client";
import {
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { VehicleState, vehicleStatus } from "@/utils/staticData";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

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
  start_condition: string;
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

interface   MyInterface {
  status: string;
  comment: string;
}

const EditVehicleOwnership = ({ ownershipId }) => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [images, setImages] = useState<Record<string, ImageType[]>>({});
  const [vehicleImage, setVehicleImage] = useState<ImageData[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSelectDisabled, setIsSelectDisabled] = useState(false);
  const [formDatas, setFormData] = useState<MyInterface>();
 const router=useRouter()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<MyInterface>();

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

      console.log("response of vehicle ownership", response);
      const formData={
        status:response?.data?.res?.status,
        comment:response?.data?.res?.comment
      }
      setFormData(formData);

      reset(formData)
      console.log("formDAta from fetch vehicle",formData);
      
      
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
      // reset(destructuredData);

      // Set the isSelectDisabled state based on ownership_status
      setIsSelectDisabled(
        response?.data?.res?.status.toLowerCase() === "pending"
      );
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log("formData", formDatas);

  useEffect(() => {
    fetchVehicle();
  }, []);

  const confirmOwnership = useCallback(
    async (data: MyInterface) => {
      console.log("123", data);
      
      try {
        const response = await axiosInstance.patch(
          `/ownership/status/${ownershipId?.clientLevelvehOwnId}`,data);
          console.log("response of edit ownership",response);
          
        toast.success(response?.data?.message);
        handleModalClose()
        router.push('/vehicleOwnershipClientOrg')
      } catch (error) {
        toast.error(error?.response?.data?.message);
        console.log(error);
      }
    },

    []
  );

  const result = () => {
    console.log("test text");
  };

  const ClientOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Ownership
        </h2>
        {formDatas?.status==="PENDING" && <button
          onClick={handleModalOpen}
          className="bg-blue-500 text-white py-2 h-10 px-4 rounded hover:bg-blue-600 transition duration-200"
        >
          Confirm Ownership
        </button>}
        {modalOpen && (
          <form onSubmit={handleSubmit(confirmOwnership)} className="mt-8 space-y-6">
            <div className="self-end justify-self-end mb-1 flex gap-5">
              <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                  <button
                    type="button"
                    onClick={handleModalClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </button>
                  <div className="grid grid-cols-1 gap-4 w-full text-gray-400 uppercase text-lg border-b mb-5 pb-1">
                    <div className="flex justify-between">
                      <h1 className="font-bold">Confirm Ownership</h1>
                      <p className="cursor-pointer" onClick={handleModalClose}>
                        x
                      </p>
                    </div>
                    <div>
                      <SelectComponent
                        label="Select status"
                        name="status"
                        options={VehicleState}
                        register={register}
                        errors={errors}
                        defaultValue=""
                      />
                      <InputField
                        label="comment"
                        type="text"
                        name="comment"
                        register={register}
                        errors={errors}
                        pattern
                      />
                      <div className="flex justify-center mt-6">
                        <button
                          type="submit"
                          className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
        <div className="max-w-7xl mx-auto p-6">
          <h2 className="text-center text-2xl font-semibold text-gray-900 mb-6">
            Vehicle Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Loan Number</p>
              <p className="text-gray-900">afdsasdfawefw</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Actual Entry Date</p>
              <p className="text-gray-900">2024-01-26</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Actual Exit Date</p>
              <p className="text-gray-900">N/A</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Manufacturing Date</p>
              <p className="text-gray-900">2024-03-26</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Make</p>
              <p className="text-gray-900">BMW</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Model</p>
              <p className="text-gray-900">M5 COMPETITION</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Variant</p>
              <p className="text-gray-900">SPORT</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Colour</p>
              <p className="text-gray-900">GREEN</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Condition</p>
              <p className="text-gray-900">GOOD</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Start Condition</p>
              <p className="text-gray-900">0</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Register Number</p>
              <p className="text-gray-900">KL03AC7317</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Engine Number</p>
              <p className="text-gray-900">uiejf38u13eh</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Chasis Number</p>
              <p className="text-gray-900">uiejf38u13eh</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Odometer</p>
              <p className="text-gray-900">N/A</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Board Type</p>
              <p className="text-gray-900">YELLOW</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">RC Available</p>
              <p className="text-gray-900">YES</p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-6">
              <p className="text-gray-700 font-semibold">Key Count</p>
              <p className="text-gray-900">1</p>
            </div>
          </div>

          <h2 className="text-center text-2xl font-semibold text-gray-900 mt-12 mb-6">
            Vehicle Images
          </h2>

          <div className="grid grid-cols-4 gap-4 col-span-3">
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
                  s
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
        </div>
      </div>
    </div>
  );
};

export default EditVehicleOwnership;
