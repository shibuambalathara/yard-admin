import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axios";
import { vehicleStatus, VehicleState } from "@/utils/staticData";
import {
  ImageMaping,
  InputField,
  RadioButtonInput,
  SelectComponent,
  TextArea,
} from "@/components/ui/fromFields";

const ViewVehicleOwnershipClient = ({ ownershipId }) => {
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [images, setImages] = useState({});
  const [vehicleImage, setVehicleImage] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const categorizedImages = vehicleImage.reduce((acc, item) => {
      if (!acc[item.img_type]) {
        acc[item.img_type] = [];
      }
      acc[item.img_type].push({ src: item.img_src, name: item.img_name });
      return acc;
    }, {});

    setImages(categorizedImages);
  }, [vehicleImage]);

  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm();

  const fetchVehicle = async () => {
    try {
      const response = await axiosInstance.get(`/ownership/${ownershipId?.clientLevelvehOwnId}`);
      const destructuredData = {
        ...response?.data?.res,
        ...response?.data?.res?.vehicle,
        ownership_status: response?.data?.res?.status,
        app_entry_date: response?.data?.res?.vehicle?.app_entry_date?.split("T")[0],
        app_exit_date: response?.data?.res?.vehicle?.app_exit_date?.split("T")[0],
        mfg_year: response?.data?.res?.vehicle?.mfg_year?.split("T")[0],
        actual_entry_date: response?.data?.res?.vehicle?.actual_entry_date?.split("T")[0],
        actual_exit_date: response?.data?.res?.vehicle?.actual_exit_date?.split("T")[0],
        status: response?.data?.res?.vehicle?.status,
      };
      setVehicleImage(response?.data?.res?.vehicle?.vehicle_img);
      reset(destructuredData);
    } catch (error) {
      console.log("Error fetching vehicle data:", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const editVehicle = useCallback(async (data) => {
    console.log("Data on submit:", data);
    // Add your submission logic here
  }, []);

  const ClientOrganisations = clientLevelOrg.map(item => ({
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
        <h2 className="text-center text-2xl font-extrabold text-gray-900">Vehicle Ownership</h2>
        <div className="self-end justify-self-end mb-1 flex gap-5">
          <button
            type="button"
            onClick={handleModalOpen}
            className="bg-blue-500 text-white py-2 h-10 px-4 rounded hover:bg-blue-600 transition duration-200"
          >
            Change Ownership
          </button>
          {modalOpen && (
            <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
                <button
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
                <form onSubmit={handleSubmit(editVehicle)} className="mt-8 space-y-6">
                  <div className="grid grid-cols-1 gap-4 w-full text-gray-400 uppercase text-lg border-b mb-5 pb-1">
                    <div className="flex justify-between">
                      <h1 className="font-bold">Change Ownership</h1>
                      <p className="cursor-pointer" onClick={handleModalClose}>x</p>
                    </div>
                    <div>
                      <SelectComponent
                        label="Select Status"
                        name="status"
                        options={VehicleState}
                        register={register}
                        errors={errors}
                        defaultValue=""
                      />
                      <InputField
                        label="Comment"
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
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewVehicleOwnershipClient;
