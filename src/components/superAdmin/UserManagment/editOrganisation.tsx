"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType, Country, superOrgCat } from "@//utils/staticData";
import {
  FormFieldInput,
  SelectInput,
  SelectComponent,
  InputField,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const EditUserOrganisation = ({ onClose, fetchData,userId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [users, setAllUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [isOrganisation,setIsOrganisation]=useState(false)

  type Inputs = {
    org_name: string;
    user_id: string;
    client_category_id: string;
    country: string;
    // clientLvlOrgIds: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const FetchClientLevelSuperUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_SUPER_USER`
      );
      setAllUsers(response?.data?.data);

      // console.log("reponse of FetchClientLevelSuperUsers ",response);

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

  const FetchUserData = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(
        `user/fetch/${userId?.profileId}`
      );

      console.log(
        "response of edit user",
        response?.data?.res?.orgDetail?.org_name
      );

      if( response?.data?.res?.orgDetail?.org_name !== ""||  response?.data?.res?.orgDetail?.org_name !== undefined){
        console.log("org found");
        setIsOrganisation(true)
        
      }

      const resetData = {
        ...response?.data?.res,
        // orgDetail: {
        //   ...response?.data?.res?.orgDetail,
        org_name: response?.data?.res?.orgDetail?.org_name,
        // },
        document_value: response?.data?.res?.documents?.document_value,

        document_type: response?.data?.res?.documents?.document_type,
        account_usage_from:
          response?.data?.data?.account_usage_from?.split("T")[0], // Extract only the date part
        account_usage_to: response?.data?.res?.account_usage_to?.split("T")[0], // Extract only the date part
      };

      
    } catch (error) {
      // console.log("resetData", initialData);

      console.log("error", error);
    
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    FetchUserData
  }, []);

  const onSubmit = async (data: Inputs) => {
    console.log("create from cientSuperorg", data);

    const modifiedData = {
      ...data,
      org_name: data?.org_name?.toUpperCase(),
    };

    console.log("modifiedDAta", modifiedData);

    try {
      const response = await axiosInstance.post(
        `clientorg/client_lvl_super_org/create`,
        modifiedData
      );

      console.log("response after superOrgCreae", response);
      toast.success(response?.data?.message);
      fetchData();
      onClose();
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }

    // Handle form submission
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-lg w-full max-w-md">
        <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
          <h1 className=" font-bold  ">Create super ORG</h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
            <div className="mb-">
              <InputField
                label="Super Organisation Name"
                type="text"
                name="org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>

            <div className="mb-">
              <SelectComponent
                label="Select Category "
                options={Role}
                name="client_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div className="mb-"></div>
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
export default EditUserOrganisation;
