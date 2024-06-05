
"use client";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  FormFieldInput,
  InputField,
  SelectInput,
  TextArea,
} from "@/components/ui/fromFields";
import { formStyle } from "@/components/ui/style";

import axiosInstance from "@/utils/axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Loading from "@/app/(home)/(superAdmin)/loading";

type Inputs = {
  cl_org_id: string;
  vehicle_category_id: string;
  park_fee_per_day: string;
};

const EditIndividualVehicle = ({ vehicleId }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientcategoryData, SetClientCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  console.log("parkId ", vehicleId);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();
  const router = useRouter();

  const FetchIndividualParkFee = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/parkfee/${vehicleId?.vehicleId}`);

      console.log("RESPONSE FOR INDIVIDAULA parkfee", response);
      SetClientCategoryData(response?.data?.res);
      reset(response?.data?.res);
    } catch (error) {
      // console.log("error", error);
    } finally {
      setIsLoading(false);
    }
  };

  

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      //   console.log("reponse of clientlevelorg ", response);

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

  console.log("client level orgs", clientLevelOrg);

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);

      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("resposne of vehicle category", response);
      reset();
      toast.success("successs");
    } catch (error) {
      console.log("error from vehiclecat", error);
      //   toast.error(error?.me);
    }
  }, []);

  useEffect(() => {
    FetchIndividualParkFee();
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, []);

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  useEffect(() => {
    FetchIndividualParkFee();
  }, []);

  const EditClientCategory = async (data: Inputs) => {
    console.log("Data on submit", data);

    try {
      // console.log('clientCatId',typeof(clientId?.clientId));

      const response = await axiosInstance.put(`/parkfee/${vehicleId?.vehicleId}`, data);
      console.log("Response after sumbit of edit parkfee", response);
      setSuccess({
        text: response?.data?.message,
      });
      // router.push('');
      router.push("/parkfee");
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex w-full h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <button
          // onClick={onClose}
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
        <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className=" font-bold  ">Add Park Fee</h1>
          {/* <p className=" cursor-pointer" onClick={onClose}>
          x
        </p> */}
        </div>
        <form
          onSubmit={handleSubmit(EditClientCategory)}
          className="  border-gray-200 "
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
            <div className="mb-">
              <InputField
                label="park Fee Per Day"
                type="number"
                name="park_fee_per_day"
                register={register}
                errors={errors}
                pattern=""
              />

              {/* cl_org_id: string;
  vehicle_category_id: string;
  park_fee_per_day:string */}
            </div>
            <div className="mb-">
              <SelectInput
                label="Selec Client Organisation"
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                error={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <SelectInput
                label="Selec Vehicle Category"
                options={vehicleCategorys}
                name="vehicle_category_id"
                register={register}
                error={errors}
                required={true}
                defaultValue=""
              />
            </div>
          </div>

          <div className=" w-full text-center p-1 mt-3  space-x-2">
            <button
              type="button"
              onClick={() => window.close()}
              className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditIndividualVehicle;
