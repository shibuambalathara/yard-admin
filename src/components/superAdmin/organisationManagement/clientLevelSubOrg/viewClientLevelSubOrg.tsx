"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType, Country } from "@//utils/staticData";
import {
  FormFieldInput,
  SelectInput,
  SelectComponent,
  InputField,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const ViewClientLevelSubOrganisation = ({ profileId }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [users, setAllUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [individual, setIndividual] = useState<Inputs | null>(null);
  type Inputs = {
    clsup_org_category: string;
    clsup_org_category_id: string;
    clsup_org_name: string;
    clsup_org_status: number;
    code: string;
    country: string;
    id: string;
    is_blocked: boolean;
    user: string;
    user_id: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  // console.log("profileid from super org",profileId?.superOrgId);
  // const dataofForm = getValues();
  // console.log("dataofform",dataofForm);

  const FetchClientLevelSuperUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_SUPER_USER`
      );
      setAllUsers(response?.data?.data);

      // console.log("reponse of FetchClientLevelSuperUsers ",response);

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

  const FetchOrganisation = useCallback(async () => {
    try {
      const allOrganisations = await axiosInstance.get(
        `clientorg/client_lvl_super_org/${profileId?.superOrgId}`
      );

      console.log(
        "fetch  response of superOrgCreae individaul",
        allOrganisations
      );

      const destructuredData = {
        ...allOrganisations?.data?.res,
        clsup_org_category:
          allOrganisations?.data?.res?.clsup_org_category?.name,
        user: allOrganisations?.data?.res?.user?.name,
      };
     

      // console.log("OPTION USERS",users);
      

      setIndividual(destructuredData);

      console.log("destructuredData", destructuredData);
      setValue('user_id', destructuredData.user);

      reset(destructuredData);
      console.log("d");
      

      // console.log("Form values after reset:", getValues());

      toast.success("fetched clientlevelsuper orgs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`error in creating superOrg`);
    }
  }, []);

  // console.log("individaul user of edit frm superOrg",individual);

  // console.log("inddividyak", individual?.clsup_org_category);

  console.log();

  useEffect(() => {
    FetchOrganisation();
    FetchClientLevelSuperUsers();
    FetchAllClientCategory();
  }, []);

  // console.log("users form optin",users);

  const AllUsers = users.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllUsers", AllUsers);

  const AllCategory = category.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllCat", AllCategory);

  const onSubmit = async (data: Inputs) => {
    console.log("data from cientSuperorg", data);
  //  const ModifiedData= {
  //     clsup_org_name: data?.clsup_org_name,
  //     userId: data?.userId,
      
  //     clsup_org_category_id: data?.clsup_org_category_id,
  //     country: data?.country,
    
  //   }

    // console.log("MODIFIEDDATA",ModifiedData);
    
    // try {
    //     const response = await axiosInstance.post(
    //       `clientorg/client_lvl_super_org/${profileId?.profileId}`
    //     );
    //     console.log("response after superOrgCreae", response);
    //     toast.success("superOrgCreated");
    //   } catch (error) {
    //     console.log("error", error);
    //     toast.error(`error in creating superOrg`);
    //   }
    //   // Handle form submission
  };

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-full max-w-md">
      {/* <button
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
        </button> */}
      <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
        <h1 className=" font-bold  ">Create super ORG</h1>
        {/* <p className=" cursor-pointer" onClick={onClose}> */}x{/* </p> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="  border-gray-200 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
          <div className="mb-">
            <InputField
              label="Super Organisation Name"
              type="text"
              name="clsup_org_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div className="mb-">
            <SelectInput
              label="Select User"
              options={AllUsers}
              name="user_id"
              register={register}
              error={errors}
              required={true}
              defaultValue={individual?.user}
            />
            {/* <div className="mb-">
              <label htmlFor="role" className="block font-bold mb-2">
                Select a user
              </label>
              <select
                id="user"
                {...register("user", { required: "user is required" })}
                className="py-1 px-12 border border-gray-300 rounded"
              >
                <option value=""></option>
                {AllUsers.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.user && (
                <p className="text-red-500">{errors.user.message}</p>
              )}
            </div> */}
          </div>

          <div className="mb-">
            <SelectInput
              label="Select Category "
              options={AllCategory}
              name="clsup_org_category_id"
              register={register}
              error={errors}
              required={true}
              defaultValue={individual?.clsup_org_category}
            />
            {/* <div className="mb-">
              <label
                htmlFor="clsup_org_category"
                className="block font-bold mb-2"
              >
                Select a cat
              </label>
              <select
                id="user"
                {...register("clsup_org_category", {
                  required: "clsup_org_category is required",
                })}
                className="py-1 px-12 border border-gray-300 rounded"
                // defaultValue={individual?.clsup_org_category}

              >
                <option value="" selected>{individual?.clsup_org_category}</option>
                {AllCategory.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.user && (
                <p className="text-red-500">{errors.user.message}</p>
              )}
            </div> */}
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
            // onClick={() => onClose()}
            className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ViewClientLevelSubOrganisation;
