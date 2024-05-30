"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State } from "@//utils/staticData";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const CreateClientLevelOrganisation = ({ onClose, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelUsers, setClientLevelUsers] = useState([]);
  const [clientLevelSuperUsers,setClientLevelSuperUsers]=useState([])
  const [category, setAllCategory] = useState([]);

  type Inputs = {
    cl_org_name: string;
    user_id:string
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
      setClientLevelSuperUsers(transformedArray)
      // console.log(
      //   "transformedArraty form ClientLevelSuperUsers",
      //   transformedArray
      // );

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
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

      toast.success("successs");
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
      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
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

    console.log("client level org modifiedData",modifiedData);
    
    try {
      const response = await axiosInstance.post(
        'clientorg/client_lvl_org/create',
        modifiedData
      );
      console.log("response after clientOrgCreaet", response);
      toast.success("superOrgCreated");
      fetchData()
      onClose()
    } catch (error) {
      // console.log("error", error);
      toast.error(error);
    }
    // Handle form submission
  },[])

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
          <h1 className=" font-bold  ">Create super ORG</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form onSubmit={handleSubmit(createClientLevelOrganisation)} className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
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
                label="Selec user"
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
                label="Selec super organisation"
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
                label=" Select Country"
                options={Country}
                name="country"
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
            {/* <div className="mb-">
              <SelectComponent
                label="Select Organisation Children"
                options={DocumentType}
                name="clientLvlOrgIds"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
          </div>

          <div className=" w-full text-center p-1 mt-3  space-x-2">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
            <button
              onClick={() => onClose()}
              className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClientLevelOrganisation;
