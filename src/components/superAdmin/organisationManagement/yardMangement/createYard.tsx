"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State, states } from "@//utils/staticData";
import { Cities } from "@/utils/cities";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";

type Inputs = {
  org_name: string;
  user_id: string;
  field_executive_name: string;
  field_executive_contact: number;

  country: string;
  state: string;
  city: string;
  postal_code: number;
  streetName: string;
  streetNumber: string;
  landMark: string;
};
import { SelectChange } from "./editIndividualYard";
const CreateYard = () => {
  const [Users, setUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [filterCity, setFilterCity] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);
 const router=useRouter()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    // Extract unique state names from Cities array
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);

    setUniqueStates(uniqueStates);
  }, []); // Only run once on component mount

  const FetchUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=YARD_MANAGER`
      );
      setUsers(response?.data?.data);

      // console.log("reponse of Users ", response);

      // toast.success("successs");
    } catch (error) {
      console.log("error", error);
      // toast.error(`something went wrong`);
    }
  }, []);

  useEffect(() => {
    FetchUsers();
  }, []);

  const AllUsers = Users?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    // console.log("selectedState from handle change",selectedState);

    setSelectedState(selectedState);
    const stateData = Cities.filter((item) => item.state === selectedState);
    console.log("selected state from state array", stateData);

    !selectedState && setFilterCity([]);

    stateData ? setFilterCity(stateData?.map((item) => item?.city)) : [];
  };

  console.log("filtered districts", filterCity);

  const createYard = useCallback(async (data: Inputs) => {
    console.log("create from cientSuperorg", data);
    const modifiedData = {
      ...data,
      org_name: data?.org_name?.toUpperCase(),
      field_executive_name: data?.field_executive_name?.toUpperCase(),
      city: data?.city,
    };

    try {
      const response = await axiosInstance.post("yard/create", modifiedData);
      console.log("response after clientOrgCreaet", response);
      toast.success(response?.data?.message);
      
      router.push("/organisationManagement/yardManagement")
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }, []);

  const close=()=>{
    router.back()
  }
  

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="max-w-5xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          <div className="w-full  mb-4">
            <h1 className="text-2xl font-bold text-black-700 pt-1  text-start">
              Create Yard Organisation
            </h1>
            <div className="border-b mt-4"></div>
          </div>

          <form
            onSubmit={handleSubmit(createYard)}
            className="space-y-3 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full place-items-center"
          >
            {/* <div className=" mt-4 pt-px">
              <SelectComponent
                label="Select User"
                options={AllUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            <div className="">
              <InputField
                label="yard Name"
                type="text"
                name="org_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>

            <div className="">
              <InputField
                label="field Executive Name"
                type="text"
                name="field_executive_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="">
              <InputField
                label="Field Executive Contact"
                type="text"
                name="field_executive_contact"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mt-4 pt-px">
            <SelectChange
              label=" State"
              name="state"
              options={uniqueStates}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
              handleChange={handleStateChange}
            /></div><div className=" ">
            <SelectChange
              label=" City"
              name="city"
              options={filterCity}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
            /></div>
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

            <div className="flex justify-end col-span-full">
              <button
                type="button"
                onClick={() => close()}
                className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition duration-200 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateYard;
