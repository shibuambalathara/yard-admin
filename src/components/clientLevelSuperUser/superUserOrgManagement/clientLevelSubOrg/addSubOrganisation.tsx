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
import { useRouter } from "next/navigation";

const CreateClientLevelSubOrganisation = () => {
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

  const router=useRouter()
  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/clientorg/client_lvl_org`);
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

      // console.log("reponse of clientlevelorg ", response);

      // toast.success(response?.data?.message);
    } catch (error) {
      // console.log("error", error);
      // toast.error(error?.response?.data?.message);
    }
  }, []);

  const FetchVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/vehicle/cat`);
      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("reponse of vehiclecat ", response);

     
    } catch (error) {
      // console.log("error", error);
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

      console.log("resposne of FetchAllClientCategory",response);
      // reset();
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
   ;
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  }, []);

  const close=()=>{
    router.back()
  }

  return (
    <div className="bg-gray-100 min-h-screen flex  justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl w-full bg-white p-8 h-fit rounded-lg shadow-lg">
      <div className="flex justify-between items-center border-b pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-700">Create Sub Organisation</h1>
        {/* <p className="cursor-pointer text-gray-500" onClick={onClose}>x</p> */}
      </div>
      <form onSubmit={handleSubmit(createClientLevelSubOrganisation)} className="space-y-6">
        <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="col-span-1">
          <InputField
                label="Enter sub Organisation Name"
                type="text"
                name="clsub_org_name"
                register={register}
                errors={errors}
                pattern=""
                placeholder=""
              />

          </div>
          <div className="col-span-1">
          <SelectComponent
                label="Select User"
                options={allSubUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />

          </div>
          <div className="col-span-1 mt-1">
          <CustomMultiSelect
                control={control}
                name="vehicleCatIds"
                options={allVehicleCategorys}
                placeholder="Select Vehicle Category"
                label="Select Vehicle Category"
                defaultValue=""
                
              />

          </div>
          <div className="col-span-1">
          <SelectComponent
                label="Select Client Organisation"
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />

          </div>
          <div className="col-span-1">
          <SelectComponent
                label="Select Client Category"
                options={FilteredclientCategorys}
                name="clsub_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder=""
              />

          </div>
          
          
         
          
        </div>
        <div className="w-full text-center pt-4 space-x-4 ">
        <button
                type="button"
                onClick={close}
                className="bg-red-500 text-white py-2 px-10  rounded-md hover:bg-red-600 transition duration-200"
              >
                Back
              </button>
          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-10 rounded-md hover:bg-green-700 transition duration-200"
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
