"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Role, DocumentType, Country, State } from "@//utils/staticData";
import {
  FormFieldInput,
  SelectInput,
  SelectComponent,
  InputField,
} from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ViewIndividualClientLevelOrg = ({ clientOrgId }) => {
  console.log("clientOrgId", clientOrgId);

  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [users, setAllUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [individual, setIndividual] = useState<Inputs | null>(null);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);

  type Inputs = {
    user_id: string;
    clsup_org_id: string;
    cl_org_name: string;
    cl_org_category_id: string;
    country: string;
    state: string;
    user: string;
    cl_org_category: string;
  };
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>();

  const router = useRouter();

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

  const FetchClientLevelUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_USER`
      );

      setAllUsers(response?.data?.data);

      //   console.log("reponse of FetchClientLevelUsers007 ", response);

      // toast.success("successs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  // //   console.log("users from state",users);

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

  const FetchIndividualClientLevelOrg = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `clientorg/client_lvl_org/${clientOrgId?.clientLevelOrgId}`
      );

      console.log("fetch  data of cl_lvl__org", response);

      const destructuredData = {
        ...response?.data?.res,
        cl_org_category: response?.data?.res?.cl_org_category?.name,
        user: response?.data?.res?.user?.name,
        clsup_org: response?.data?.res?.clsup_org?.clsup_org_name,
      };

      setIndividual(destructuredData);

      //   console.log("destructuredData", destructuredData);

      reset(destructuredData);
      //   console.log("d");

      // console.log("Form values after reset:", getValues());

      // toast.success("fetched clientlevelsuper orgs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`error in creating superOrg`);
    }
  }, []);

  useEffect(() => {
    FetchIndividualClientLevelOrg();
    FetchClientLevelUsers();
    FetchAllClientCategory();
    FetchClientLevelSuperUsers();
  }, []);

  const AllUsers = users?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  let result = AllUsers.filter((item) => item?.value == individual?.user_id);
  if (result.length === 0) {
    // The individual.user_id is not present in AllUsers, so we push a new item
    AllUsers.push({ label: individual?.user, value: individual?.user_id });
    // console.log("Updated AllUsers", AllUsers);
  } else {
    // If AllUsers is empty, we can directly push the new item
    AllUsers.push({ label: individual?.user, value: individual?.user_id });
    //   console.log("Updated AllUsers", AllUsers);
  }

  //   console.log("AllUsers", AllUsers);

  const AllCategory = category.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllCat", AllCategory);

  const onSubmit = async (data: Inputs) => {
    console.log("data for submit", data);

    const submittingData = {
      ...data,
      cl_org_name: data?.cl_org_name?.toUpperCase(),
    };

    console.log("modified data for submit", submittingData);

    try {
      const response = await axiosInstance.put(
        `clientorg/client_lvl_org/${clientOrgId?.clientLevelOrgId}`,
        submittingData
      );
      console.log("response after sumbit of cl_lvl_org", response);
      toast.success(response?.data?.message);
      router.push("/organisationManagement/clientLevelOrg");
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    //   // Handle form submission
  };

  return (
    <>
   

      <div className="bg-gray-100 min-h-screen flex items- justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full h-fit bg-white p-8 rounded-lg shadow-lg">
          <div className="flex justify-between items-center border-b pb-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-700">
               update Organisation
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="  border-gray-200 "
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 place-items-center">
              <div className="mb-">
                <InputField
                  label="Client Organisation Name"
                  type="text"
                  name="cl_org_name"
                  register={register}
                  errors={errors}
                  pattern=""
                />
              </div>
              <div className="mb-">
                <SelectInput
                  label="Select Super Organisation "
                  options={clientLevelSuperUsers}
                  name="clsup_org_id"
                  register={register}
                  error={errors}
                  required={false}
                  defaultValue=""
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
                  defaultValue=""
                />
              </div>

              <div className="mb-">
                <SelectInput
                  label="Select Category "
                  options={AllCategory}
                  name="cl_org_category_id"
                  register={register}
                  error={errors}
                  required={true}
                  defaultValue=""
                />
                {/* clsup_org_id */}
              </div>

              {/* <div className="mb-">
                <SelectInput
                  label=" Select Country"
                  options={Country}
                  name="country"
                  register={register}
                  error={errors}
                  required={true}
                  defaultValue=""
                />
              </div> */}
              <div className="mb-">
                <SelectInput
                  label=" Select State"
                  options={State}
                  name="state"
                  register={register}
                  error={errors}
                  required={true}
                  defaultValue=""
                />
              </div>
            </div>

            <div className="w-full text-center pt-8 space-x-4 ">
              <button
                type="button"
                onClick={()=>window.close()}
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

export default ViewIndividualClientLevelOrg;
