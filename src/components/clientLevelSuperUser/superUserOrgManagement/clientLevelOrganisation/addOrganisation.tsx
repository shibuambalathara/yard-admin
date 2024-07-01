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
      <h1 className="p-2 uppercase text-center">create Organisation</h1>
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

      <form className="space-y-2  " onSubmit={handleSubmit(createClientLevelOrganisation)}>
        {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-2  h-56 overflow-y-scroll scrollbar-hide">
          <div>
            <FormFieldInput
              label=""
              type="text"
              name="name"
              register={register}
              error={errors.name}
              defaultValue=""
              required
              placeholder="Enter your  name"
           
            />
          </div>
          <div>
            <FormFieldInput
              label=""
              type="email"
              name="email"
              register={register}
              error={errors.email}
              defaultValue=""
              required
              placeholder="Enter your email address"
              
            />
          </div>
          <div>
            <FormFieldInput
              label=""
              type="text"
              name="contact"
              register={register}
              error={errors.contact}
              defaultValue=""
              required
              placeholder="Enter your contact number"
             
            />
          </div>
          <div>
            <FormFieldInput
              label=""
              type="text"
              name="designation"
              register={register}
              error={errors.designation}
              defaultValue=""
              required
              placeholder="Enter your designation"
          
            />
          </div>
          
          <div>
          <FormFieldInput
              label=""
              type="password"
              name="password"
              register={register}
              error={errors.name}
              defaultValue=""
              required
              placeholder="Enter Password"
           
            />
          </div>
          
          <div className="col-span-1">
          <div>
            <SelectComponent
              label=""
              name="role"
              options={SuperUserChildren}
              register={register}
              errors={errors}
              defaultValue=""
              placeholder="select role"
            />
          </div>
          </div>
        </div> */}
                  <div className="grid  grid-cols-1 md:grid-cols-1 gap-2  place-items-center h-auto overflow-y-scroll scrollbar-hide ">
           
              <InputField
                label=" "
                type="text"
                name="cl_org_name"
                register={register}
                errors={errors}
                pattern=""
                placeholder="Enter Organisation"
              />
          
            <div className="mb-">
              <SelectComponent
                label=""
                options={allClientLevelUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select User"
              />
            </div>
            {/* <div className="mb-">
              <SelectComponent
                label="Selec super organisation"
                options={clientLevelSuperUsers}
                name="clsup_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            <div className="mb-">
              <SelectComponent
                label=""
                options={AllCategory}
                name="cl_org_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select Category"
              />
            </div>
            {/* <div className="mb-">
              <SelectComponent
                label=" Select Country"
                options={Country}
                name="country"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div> */}
            <div className="mb-">
              {/* <SelectComponent
                label=" "
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select State"
              /> */}
              <div className="mb-">
              <SelectComponent
                label=""
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                placeholder="Select State"
              />
            </div>
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

export default CreateClientLevelOrganisation;
