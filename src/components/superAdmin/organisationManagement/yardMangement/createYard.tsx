
"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State, states } from "@//utils/staticData";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";
import { log } from "console";
import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";
const CreateYard = ({ onClose ,fetchYard}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [Users, setUsers] = useState([]);
  const [category, setAllCategory] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [filterDistricts, setFilterDistricts] = useState([]);

  type Inputs = {
    yard_name: string;
    user_id:string
    field_executive_name: string;
    field_executive_contact: number;
    
    country: string;
    state: string;
    district:string;
    postal_code:number;
    streetName: string;
    streetNumber: string;
    landMark : string;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  

  const FetchUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=YARD_MANAGER`
      );
      setUsers(response?.data?.data);

      // console.log("reponse of Users ", response);

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, []);

  

  useEffect(() => {
    FetchUsers();
  }, []);

  const AllUsers = Users?.map((item) => ({
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
  

  // const CreateYard = useCallback(async (data: Inputs) => {
    
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const stateData = states.find(state => state.state === selectedState);
    setFilterDistricts(stateData ? stateData.districts : []);
  };
   
    // console.log('kerala',singleState);
    
    
    // const {districts} =  singleState
    // console.log("kerala",districts)
  //   // Handle form submission
  // },[])
  const createYard = useCallback(async (data: Inputs) => {
    console.log("create from cientSuperorg", data);
    const modifiedData = {
      ...data,
      yard_name: data?.yard_name?.toUpperCase(),
      field_executive_name: data?.field_executive_name?.toUpperCase(),
      district : data?.district
    };

    // console.log("client level org modifiedData",modifiedData);
    
    try {
      const response = await axiosInstance.post(
        'yard/create',
        modifiedData
      );
      console.log("response after clientOrgCreaet", response);
      console.log("yard created");
      fetchYard()
      onClose()
      
    } catch (error) {
      console.log("error", error);
      // toast.error(error);
    }
  
  },[])
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 ">
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
          <h1 className=" font-bold  ">Create Yard</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form onSubmit={handleSubmit(createYard)} className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border h-96 overflow-y-scroll ">
        
            
            <div className="mb-">
              <SelectComponent
                label="Select user"
                options={AllUsers}
                name="user_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="yard Name"
                type="text"
                name="yard_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
           
            <div className="mb-">
              <InputField
                label="fieldExecutiveName"
                type="text"
                name="field_executive_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="field executive contact"
                type="text"
                name="field_executive_contact"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="postal code"
                type="text"
                name="postal_code"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="street name"
                type="text"
                name="street_name"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <InputField
                label="land mark"
                type="text"
                name="land_mark"
                register={register}
                errors={errors}
                pattern=""
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
                label=" Select State"
                options={State}
                name="state"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
                
              />
            </div>  */}
            <div className="flex flex-col w-full">
  <label htmlFor="state" className={labelStyle?.data}>
    Select State
  </label>
  <select
    id="state"
    {...register('state', { required: true })}
    className={inputStyle.data}
    defaultValue=""
    onChange={handleStateChange}
  >
    <option value="" disabled hidden>
      Select state
    </option>
    {states.map((option, index) => (
      <option key={index} value={option.state}>
        {option.state}
      </option>
    ))}
  </select>
  {errors.state && (
    <p className="text-red-500">State is required</p>
  )}
</div>
            



            <div className="flex flex-col w-full">
  <label htmlFor="district" className={labelStyle?.data}>
    Select district
  </label>
  <select
    id="district"
    {...register('district', { required: true })}
    className={inputStyle.data}
    defaultValue=""
  >
    <option value="" disabled hidden>
      Select district
    </option>
    {filterDistricts.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
  {errors.state && (
    <p className="text-red-500">State is required</p>
  )}
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












export default CreateYard