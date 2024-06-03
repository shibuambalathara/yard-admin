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
import { useRouter } from 'next/navigation'

const ViewClientLevelSuperOrg = ({ profileId }) => {
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

 const router=useRouter()
  

//   console.log("profileid from super org",profileId);
  // const dataofForm = getValues();
  // console.log("dataofform",dataofForm);

  const FetchClientLevelSuperUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=CLIENT_LEVEL_SUPER_USER`
      );

      setAllUsers(response?.data?.data);

    //   console.log("reponse of FetchClientLevelSuperUsers007 ",response);

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

//   console.log("users from state",users);
  

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
        "fetch  data of cl_lvl_super_org",
        allOrganisations
      );

      const destructuredData = {
        ...allOrganisations?.data?.res,
        clsup_org_category:
          allOrganisations?.data?.res?.clsup_org_category?.name,
        user: allOrganisations?.data?.res?.user?.name,
      };
     

    //   const level = users?.filter(item => item?.id === allOrganisations?.data?.res?.user_id);
        
        
      
      

    //   console.log("level",level);
      
      
    //   allOrganisations?.data?.res?.user_id

      // console.log("OPTION USERS",users);
      

      setIndividual(destructuredData);

    //   console.log("destructuredData", destructuredData);
      

      reset(destructuredData);
    //   console.log("d");
      

      // console.log("Form values after reset:", getValues());

      toast.success("fetched clientlevelsuper orgs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`error in creating superOrg`);
    }
  }, []);

//   console.log("individaul user of edit frm superOrg",individual);

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


 let result= AllUsers.filter((item)=>item?.value == individual?.user_id)

//  console.log("result",result);
 
  
 if (result.length === 0) {
    // The individual.user_id is not present in AllUsers, so we push a new item
    AllUsers.push({ label:individual?.user,value: individual?.user_id });
    // console.log("Updated AllUsers", AllUsers);
  }
 else {
  // If AllUsers is empty, we can directly push the new item
  AllUsers.push({ label:individual?.user,value: individual?.user_id });
//   console.log("Updated AllUsers", AllUsers);
}

// console.log("Updated AllUsers", AllUsers);

// console.log("result",result);


  // console.log("AllUsers", AllUsers);

  const AllCategory = category.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // console.log("AllCat", AllCategory);

  const onSubmit = async (data: Inputs) => {
    console.log("data from cientSuperorg", data);
   const ModifiedData= {
     ...data,
     clsup_org_name:data?.clsup_org_name?.toUpperCase()  
    }

    console.log("MODIFIEDDATA",ModifiedData);
    
    try {
        const response = await axiosInstance.put(
          `clientorg/client_lvl_super_org/${profileId?.superOrgId}`,ModifiedData
        );
        console.log("response after superOrgCreae", response);
        toast.success(response?.data?.message);
      } catch (error) {
        console.log("error", error);
        toast.error(error?.response?.data?.message);
      }
    //   // Handle form submission
  };

  return (
    // <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
   <div className="h-full w-full flex items-center justify-center border">
    <div className="bg-white p-4 rounded-lg w-full max-w-md border">
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
      <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1 ">
        <h1 className=" font-bold  ">Edit super ORG</h1>
        {/* <p className=" cursor-pointer" onClick={onClose}> */}{/* </p> */}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className=" border border-gray-200 ">
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
            
          </div>
          <div className="mb-">
            {/* <SelectInput
              label=" Select Country"
              options={Country}
              name="country"
              register={register}
              error={errors}
              required={true}
              defaultValue=""
            /> */}
          </div>
          
        </div>

        <div className=" w-full text-center p-1 mt-3  space-x-2 flex justify-around">
        
          
          <button
            type="button"
              onClick={() => window.close()}
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

export default ViewClientLevelSuperOrg;
