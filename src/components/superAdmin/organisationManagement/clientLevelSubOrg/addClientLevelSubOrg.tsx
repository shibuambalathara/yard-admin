"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State } from "@//utils/staticData";
import {
  SelectComponent,
  InputField,
  CustomMultiSelect,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const CreateClientLevelSubOrganisation = ({ onClose, fetchSubOrganisation, }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelSubUsers, setClientLevelSubUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [allVehicleCategory, setAllVehicleCategory] = useState([]);
  type Inputs = {
    user_id: string;
    cl_org_id: string;
    vehicleCatIds: string[];
    clsub_org_name: string;
    clsub_org_category_id: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      // console.log("reponse of clientlevelorg ", response);

      // toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      // toast.error(error?.response?.data?.message);
    }
  }, []);

  const FetchVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("reponse of vehiclecat ", response);

      // toast.success(response?.data?.message);
    } catch (error) {
      console.log("error", error);
      // toast.error(error?.response?.data?.message);
    }
  }, []);

  console.log("allVehicleCategory", allVehicleCategory);

  const FetchClientLevelSubOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_SUB_USER`
      );
      setClientLevelSubUsers(response?.data?.data);

      // console.log("reponse of clientLevelSubUsers ", response);

      // toast.success("successs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  const FetchAllClientCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`clientorg/cat/`);

      setAllCategory(response?.data?.clientCategory);

      // console.log("resposne of FetchAllClientCategory",response);
      reset();
      // toast.success("successs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  useEffect(() => {
    FetchClientLevelOrgs();
    FetchAllClientCategory();
    FetchClientLevelSubOrgs();
    FetchVehicleCategory();
  }, []);

  const allSubUsers = clientLevelSubUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const allClientCategory = category?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name,
  }));
  const allVehicleCategorys = allVehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log("options", allVehicleCategorys);

  // console.log("AllUsers", AllUsers);
  // console.log("AllCat", AllCategory);
  //   console.log("clientLevelSuperUsers",clientLevelSuperUsers);

  const createClientLevelSubOrganisation = useCallback(async (data: Inputs) => {
    console.log("data from createClientLevelSubOrganisation",data);
    
    // console.log("create from cientSuperorg", data);
    const modifiedData = {
      ...data,
      cl_org_name: data?.clsub_org_name?.toUpperCase(),
    };

    console.log("client level org modifiedData", modifiedData);

    try {
      const response = await axiosInstance.post(
        "clientorg/client_lvl_sub_org/create",
        modifiedData
      );
      // console.log("response after clientOrgCreaet", response);
      toast.success(response?.data?.message);
      fetchSubOrganisation();
      onClose();
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <button
          onClick={onClose}
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
          <h1 className=" font-bold  ">Create Sub Org</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form
          onSubmit={handleSubmit(createClientLevelSubOrganisation)}
          className="  border-gray-200 "
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border h-form-Modal scrollbar-hide overflow-y-scroll ">
            <div className="mb-">
              <InputField
                label=" Sub Organisation Name"
                type="text"
                name="clsub_org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
 
            <div className="mb-">
              <SelectComponent
                label="Selec user"
                options={allSubUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            
            <div className="p-4 w-80">
      <CustomMultiSelect
        control={control}
        name="vehicleCatIds"
        options={allVehicleCategorys}
        placeholder="Select Vehicle Category"
        label="Select Vehicle Category"
        defaultValue=""
      />
    </div>
            <div className="mb-">
              <SelectComponent
                label="Select Client Organisation "
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <SelectComponent
                label=" Select Client Category"
                options={allClientCategory}
                name="clsub_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
          </div>

          <div className=" w-full text-center p-1 mt-3  space-x-2">
            <button
              type="button"
              onClick={() => onClose()}
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

export default CreateClientLevelSubOrganisation;
