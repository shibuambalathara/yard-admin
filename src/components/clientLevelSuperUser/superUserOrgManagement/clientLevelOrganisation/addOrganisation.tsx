"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State } from "@//utils/staticData";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
// import {FetchAllClientCategory} from "@/components/commonApi/commonApi"
import {FetchAllClientCategory,fetchSuperUserUsers} from "@/utils/commonApi/commonApi"

const CreateClientLevelOrganisation = ({ onClose, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelUsers, setClientLevelUsers] = useState([]);
  const [clientLevelSuperUsers, setClientLevelSuperUsers] = useState([]);
  const [allClientcategory, setAllClientCategory] = useState([]);

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


useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          clientLevelSuperUserUsers,
          clientCategoryData
        ] = await Promise.all([

            fetchSuperUserUsers(),
            FetchAllClientCategory()
        ]);
console.log("useeffect",clientLevelSuperUserUsers);

        // setClientLevelSuperUsers(superUsersData);
        setClientLevelUsers(clientLevelSuperUserUsers);
        setAllClientCategory(clientCategoryData);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  console.log("allClientcategory",allClientcategory);
  

  const allClientLevelUsers = clientLevelUsers?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  console.log("allClientLevelUsers",allClientLevelUsers);
  

  const AllCategory = allClientcategory?.map((item) => ({
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
      
      fetchData()
      onClose()
    } catch (error) {
      // console.log("error", error);
      toast.error(error?.response?.data?.message);
    }
    // Handle form submission
  },[])

  return (
    <div className="flex items-center justify-center relative z-50 ">
    <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 ">
      <div className="">
      <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">create Organisation</h1>
      <div className="border-b "></div>
      </div>
     
      <form className="space-y-2  " onSubmit={handleSubmit(createClientLevelOrganisation)}>
        
     <div className="grid  grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide ">
           
              <InputField
                label="Enter Organisation"
                type="text"
                name="cl_org_name"
                register={register}
                errors={errors}
                pattern=""
                placeholder=""
              />
          
            <div className="mb-">
              <SelectComponent
                label="Select a User"
                options={allClientLevelUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="User"
              />
            </div>
           
            <div className="mb-">
              <SelectComponent
                label="Select Category"
                options={AllCategory}
                name="cl_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Category"
              />
            </div>
            
            <div className="mb-">
              
              <div className="mb-">
              <SelectComponent
                label="Select a State"
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="State"
              />
            </div>
            </div>
            
          </div>
        <div className="w-full  text-center space-x-4">
        <button
         onClick={()=>onClose()}
            type="button"
            className="bg-gradient-to-r from-red-500 uppercase to-red-700 text-white py-2 px-6 rounded-lg  hover:from-red-600 hover:to-red-800 transition duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 uppercase to-green-700 text-white py-2 px-6 rounded-lg  hover:from-green-600 hover:to-green-800 transition duration-300 transform hover:scale-105"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  </div>
  );
};

export default CreateClientLevelOrganisation;
