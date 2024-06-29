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

const EditParkFeeIndividual = ({ userId,onClose }) => {
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientcategoryData, SetClientCategoryData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory, setAllVehicleCategory] = useState([]);
  console.log("userId ", userId);

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
      const response = await axiosInstance.get(`/parkfee/${userId}`);

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

      const response = await axiosInstance.put(`/parkfee/${userId}`, data);
      console.log("Response after sumbit of edit parkfee", response);
      setSuccess({
        text: response?.data?.message,
      });
      onClose()
    } catch (error) {
      console.error("Error:", error.response);
      toast.error(error?.response?.data?.message);
    }
  };

  

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="  rounded-lg w-full max-w-md">
      
        
        <form
          onSubmit={handleSubmit(EditClientCategory)}
          className=""
        >
          <div className=" mx-auto grid bg-white grid-cols-1 relative gap-x-8 gap-y-4 justify-center items-center place-items-center p-2 w-fit border rounded-xl px-6 py-8 ">
          <button
        className="absolute top-0 p-2 right-0 text-gray-400 hover:text-gray-600 transition duration-200"
        onClick={() => onClose()}
      >
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
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
            <div className=" w-full text-center p-1 mt-3  space-x-2">
            <button
              type="button"
              onClick={() =>onClose()}
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
          </div>

         
        </form>
      </div>
    </div>
  );
};

export default EditParkFeeIndividual;
