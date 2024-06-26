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

const CreateClientLevelSubOrganisation = ({ onClose, fetchData }) => {
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

      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const FetchVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("reponse of vehiclecat ", response);

      toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
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
      // console.log("error", error);
      toast.error(`something went wrong`);
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
      // console.log("error", error);
      toast.error(`something went wrong`);
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

  const FilteredclientCategorys=allClientCategory.filter((item)=>item?.label==="BANK")

  console.log("FilteredclientCategorys",FilteredclientCategorys);
  

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
    console.log("data from createClientLevelSubOrganisation", data);

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
      fetchData();
      onClose();
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  }, []);

  return (
    <div className="flex items-center justify-center relative z-50 ">
      <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl  overflow-y-scroll scrollbar-hide  ">
        <h1 className="p-2 uppercase text-center">create sub Organisation</h1>
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition duration-200"
          onClick={onClose}
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

        <form
          className="space-y-2  "
          onSubmit={handleSubmit(createClientLevelSubOrganisation)}
        >
          <div className="max-w-7xl grid grid-cols-2 gap-5 justify-center place-items-center p-2 border  scrollbar-hide overflow-y-scroll ">
            <div className="mb-">
              <InputField
                label=" "
                type="text"
                name="clsub_org_name"
                register={register}
                errors={errors}
                pattern=""
                placeholder="Enter sub Organisation Name"
              />
            </div>

            <div className="mb-">
              <SelectComponent
                label=""
                options={allSubUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Selec user"
              />
            </div>

            <div className="p-4 w-80">
              <CustomMultiSelect
                control={control}
                name="vehicleCatIds"
                options={allVehicleCategorys}
                placeholder="Select Vehicle Category"
                label=""
                defaultValue=""
                
              />
            </div>
            <div className="mb-">
             
              <SelectComponent
                label=""
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select Client Organisation"
              />
            </div>
            <div className="mb-">
              <SelectComponent
                label=""
                options={FilteredclientCategorys}
                name="clsub_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select Client Category"
              />
            </div>
          </div>
          <div className="w-full  text-center">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 uppercase to-blue-700 text-white py-3 px-6 rounded-lg w-60 hover:from-blue-600 hover:to-blue-800 transition duration-300 transform hover:scale-105"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientLevelSubOrganisation;
