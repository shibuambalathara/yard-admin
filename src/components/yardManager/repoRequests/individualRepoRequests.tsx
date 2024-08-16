"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { DisabledInput, InputField, SelectInput } from "../../ui/fromFields"; // Assuming you have a SelectInput component
import img1 from "../../../../public/aadhar.jpg";
import img2 from "../../../../public/aadhar.jpg";
import img3 from "../../../../public/aadhar.jpg";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { TbRuler } from "react-icons/tb";
import { VehicleEntryStatus } from "@/utils/staticData";
import { log } from "util";

type User = {
  code: string;
  name: string;
};

type RepoVehicle = {
  code: string;
  make: string;
  model: string;
  reg_number: string;
  vehicle_category: {
    name: string;
  };
};

type ReqByUserOrg = {
  user: User;
};

type ReqToYard = {
  code: string;
  org_name: string;
  org_type: string;
};

type Inputs = {
  expected_entry_date: string;
  id: string;
  repo_vehicle: RepoVehicle;
  req_by_user_org: ReqByUserOrg;
  req_date: string;
  req_to_yard: ReqToYard;
  res_by_user_org: null | string; // or whatever type it should be
  res_date: null | string;
  status: string;
  success: boolean;
};

const images = [img1, img2, img3]; // Array containing imported images

const IndividualRepoRequests = ({ yardId }) => {
  const [yardData, setYardData] = useState<Inputs | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const [modalType, setModalType] = useState(null);

  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchInddividualVehicle = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `repo_yard/request/${yardId?.yardVehId}`
      );
      console.log(
        "response?.data?.expected_entry_date",
        response?.data?.res?.expected_entry_date
      );

      setYardData(response?.data?.res);
      const ModifiedData = {
        ...response?.data?.res,
        expected_entry_date:
          response?.data?.res?.expected_entry_date?.split("T")[0],
        // response?.data?.res?.mfg_year.split("T")[0],
      };

      console.log(
        "modified Data",
        response?.data?.res?.expected_entry_date?.split("T")[0]
      );

      reset(ModifiedData);
    } catch (error) {
      console.log("FetchInddividualVehicle", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchInddividualVehicle();
  }, [yardId]);

  // const handleModalOpen = (value = false) => {
  //   setModalOpen(true);
  //   if (value) {
  //     setShowStatus(true);
  //   } else {
  //     setShowStatus(false);
  //   }
  // };

  const handleModalOpen = (type) => {
    setModalOpen(true);
    setModalType(type);
    setShowStatus(type === "status");
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const onSubmit = async (data) => {
    try {
      let payload;
      let endpoint;
      // const validFrom = new Date(data?.expected_entry_date).toISOString();

      const expectedEntryDate = new Date(data.expected_entry_date).toISOString();

    // Create the payload with the converted date
     payload = { expected_entry_date: expectedEntryDate };

    console.log("payload", payload);

      // if (payload === yardData?.status)
      //   throw new Error("Cannot Update Same Status");

      endpoint = `repo_yard/request/${yardId?.yardVehId}`;

      const response = await axiosInstance.patch(endpoint, payload);

      toast.success(response?.data?.message);
      FetchInddividualVehicle();
      setModalOpen(false);
      router.push("/repoRequests");
    } catch (error) {
      console.error("Error updating entry", error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
        <h2 className="text-center text-2xl font-extrabold text-gray-900">
          Vehicle Details
        </h2>

        <div className="mt-8 space-y-12 flex flex-col">
          <div className="space-y-4 grid place-items-start">
            <h1 className="font-bold text-lg uppercase border w-full p-1 bg-gradient-to-r from-slate-100 to-slate-500 text-gray-900 shadow-md">
              Repo Vehicle Details
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
              <DisabledInput
                label="Registration Number"
                type="text"
                name="loan_number"
                value={yardData?.repo_vehicle?.reg_number || ""}
              />
              <DisabledInput
                label="Make"
                type="text"
                name="make"
                value={yardData?.repo_vehicle?.make || ""}
                disabled={true}
              />
              <DisabledInput
                label="Model"
                type="model"
                name="Model"
                value={yardData?.repo_vehicle?.model || ""}
              />
              <DisabledInput
                label="Vehicle Category"
                type="text"
                name="category"
                value={yardData?.repo_vehicle?.vehicle_category?.name || ""}
              />
              <DisabledInput
                label="Code"
                type="text"
                name="actual_entry_date"
                value={yardData?.repo_vehicle?.code || ""}
              />
            </div>
          </div>

          <div className="space-y-4 grid place-items-start">
            <h1 className="font-bold text-lg uppercase border w-full p-1 bg-gradient-to-r from-slate-100 to-slate-500 text-gray-900 shadow-md">
              Requested User
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
              <DisabledInput
                label="Name"
                type="text"
                name="name"
                value={yardData?.req_by_user_org?.user?.name || ""}
              />
              <DisabledInput
                label="User Code"
                type="text"
                name="code"
                value={yardData?.req_by_user_org?.user?.code || ""}
                disabled={true}
              />
              <DisabledInput
                label="Requested Date"
                type="date"
                name="date"
                value={yardData?.req_date || ""}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-bold text-lg uppercase border w-full p-1 bg-gradient-to-r from-slate-100 to-slate-500 text-gray-900 shadow-md">
              Requested Yard
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
              <DisabledInput
                label="Name"
                type="text"
                name="loan_number"
                value={yardData?.req_to_yard?.org_name || ""}
              />
              <DisabledInput
                label="Type"
                type="text"
                name="make"
                value={yardData?.req_to_yard?.org_type || ""}
                disabled={true}
              />
              <DisabledInput
                label="Code"
                type="text"
                name="Model"
                value={yardData?.req_to_yard?.code || ""}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="font-bold text-lg uppercase border w-full p-1 bg-gradient-to-r from-slate-100 to-slate-500 text-gray-900 shadow-md">
              Other Details
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 place-items-center">
              <DisabledInput
                label="Expected Entry Date"
                type="date"
                name="loan_number"
                value={yardData?.expected_entry_date || ""}
              />
              <DisabledInput
                label="Status"
                type="text"
                name="make"
                value={yardData?.status || ""}
                disabled={true}
              />
            </div>
          </div>

          <div className="self-center space-x-4">
            {yardData?.status !== "ENTRY_REJECTED" &&
              yardData?.status !== "ENTRY_CANCELLED" && (
                <div className="space-x-4">
                  <button
                    type="button"
                    onClick={() => handleModalOpen("status")}
                    className="px-8 py-2 text-center bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                  >
                    Modify Expected Date
                  </button>
                </div>
              )}
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-4 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center pb-3 w-full">
              <h2 className="text-xl font-semibold text-center  w-full">
                Modify Expected Entry Date
              </h2>
              <button onClick={handleModalClose}>&times;</button>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex  flex-col justify-center items-center"
            >
              <div className="mb-">
                <InputField
                  disabled={false}
                  label="Expected Date"
                  type="date"
                  name="expected_entry_date"
                  register={register}
                  errors={errors}
                  pattern
                />
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndividualRepoRequests;
