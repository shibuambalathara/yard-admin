"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State, states } from "@//utils/staticData";
import { Cities } from "@/utils/cities";
import { SelectComponent, InputField, SelectChange } from "@/components/ui/fromFields";
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
  name: string;
  user_id: string;
  

  country: string;
  state: string;
  city: string;
  postal_code: number;
  streetName: string;
  streetNumber: string;
  landMark: string;
};

const AddRepo = ({onClose, fetchData}) => {
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

  const AddRepo = useCallback(async (data: Inputs) => {
    console.log("create from cientSuperorg", data);
    const modifiedData = {
     
      
      org_name:data?.name,
      city: data?.city,
      state: data?.state,
    };

    try {
      const response = await axiosInstance.post("/repo-agency", modifiedData);
      console.log("response after clientOrgCreaet", response);
      toast.success(response?.data?.message);
      onClose()
      fetchData()
    } catch (error) {
      console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
  }, []);



  return (
   
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-full max-w-md">
     
      <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
        <h1 className=" font-bold  ">Create Repo </h1>
        
      </div>

          <form
            onSubmit={handleSubmit(AddRepo)}
            className="space-y-3 grid grid-cols-1  gap-3 w-full place-items-center"
          >
           
            <div className="">
              <InputField
                label="Name"
                type="text"
                name="name"
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
                onClick={() => onClose()}
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
  
  );
};

export default AddRepo;




