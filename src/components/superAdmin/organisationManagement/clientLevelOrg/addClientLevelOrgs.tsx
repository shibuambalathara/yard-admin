"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State } from "@//utils/staticData";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CreateClientLevelOrganisation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelUsers, setClientLevelUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const router = useRouter();
  type Inputs = {
    cl_org_name: string;
    user_id: string;
    clsup_org_id: string;
    cl_org_category_id: string;
    country: string;
    state: string;
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
        `/clientorg/client_lvl_super_org`
      );
      // setAllUsers(response?.data?.data);

      // console.log("reponse of FetchClientLevelSuperUsers ", response);

      const transformedArray = response?.data?.res?.clientLvlSuperOrg.map(
        (item) => ({
          label: item.clsup_org_name,
          value: item.id,
        })
      );
      setClientLevelSuperUsers(transformedArray);
      // console.log(
      //   "transformedArraty form ClientLevelSuperUsers",
      //   transformedArray
      // );

      // toast.success("successs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  // console.log('setClientLevelSuperUser',clientLevelSuperUsers);

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_USER`
      );
      setClientLevelUsers(response?.data?.data);

      // console.log("reponse of clientlevelusers ", response);

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
    FetchClientLevelSuperUsers();
    FetchAllClientCategory();
    FetchClientLevelOrgs();
  }, []);

  const AllUsers = clientLevelUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const AllCategory = category?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllUsers", AllUsers);
  // console.log("AllCat", AllCategory);
  //   console.log("clientLevelSuperUsers",clientLevelSuperUsers);

  const createClientLevelOrganisation = useCallback(async (data: Inputs) => {
    console.log("create from cientSuperorg", data);
    const modifiedData = {
      ...data,
      cl_org_name: data?.cl_org_name?.toUpperCase(),
    };

    console.log("client level org modifiedData", modifiedData);

    try {
      const response = await axiosInstance.post(
        "clientorg/client_lvl_org/create",
        modifiedData
      );
      console.log("response after clientOrgCreaet", response);
      toast.success(response?.data?.message);
      router.push("/organisationManagement/clientLevelOrg");
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  }, []);

  const close = () => {
    router.back();
  };
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items- justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full h-fit bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-700">
              Create Organisation
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(createClientLevelOrganisation)}
            className="  border-gray-200 "
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
              <div className="mb-">
                <InputField
                  label=" Organisation Name"
                  type="text"
                  name="cl_org_name"
                  register={register}
                  errors={errors}
                  pattern=""
                />
              </div>
              <div className="mb-">
                <SelectComponent
                  label="Select User"
                  options={AllUsers}
                  name="user_id"
                  register={register}
                  errors={errors}
                  required={true}
                  defaultValue=""
                />
              </div>
              <div className="mb-">
                <SelectComponent
                  label="Select Super Organisation"
                  options={clientLevelSuperUsers}
                  name="clsup_org_id"
                  register={register}
                  errors={errors}
                  required={true}
                  defaultValue=""
                />
              </div>
              <div className="mb-">
                <SelectComponent
                  label="Select Category "
                  options={AllCategory}
                  name="cl_org_category_id"
                  register={register}
                  errors={errors}
                  required={true}
                  defaultValue=""
                />
              </div>

              <div className="mb-">
                <SelectComponent
                  label=" Select State"
                  options={State}
                  name="state"
                  register={register}
                  errors={errors}
                  required={true}
                  defaultValue=""
                />
              </div>
              
            </div>

            <div className="w-full text-center pt-8 space-x-4 ">
              <button
                type="button"
                onClick={close}
                className="bg-red-500 text-white py-2 px-10 rounded-md hover:bg-red-600 transition duration-200"
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
    </>
  );
};

export default CreateClientLevelOrganisation;
