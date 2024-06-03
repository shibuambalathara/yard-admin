"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import { Country, State } from "@//utils/staticData";
import { SelectComponent, InputField } from "@/components/ui/fromFields";
import React from "react";
import axiosInstance from "@/utils/axios";
import toast from "react-hot-toast";

const AddParkFee = ({ onClose, fetchData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [clientLevelOrg, setClientLevelOrg] = useState([]);
  const [vehicleCategory,setAllVehicleCategory]=useState([])
  const [category, setAllCategory] = useState([]);

  type Inputs = {
    vehicle_category_id: string;
    park_fee_per_day:Number
    cl_org_id: string;
     };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();


  

  const FetchClientLevelOrgs = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/clientorg/client_lvl_org`
      );
      setClientLevelOrg(response?.data?.res?.clientLevelOrg);

    //   console.log("reponse of clientlevelorg ", response);

      toast.success("successs");
    } catch (error) {
      // console.log("error", error);
      toast.error(`something went wrong`); 
    }
  }, []);

//   console.log("client level orgs",clientLevelOrg);
  

  const FetchAllVehicleCategory = useCallback(async () => {
    try {
      const response = await axiosInstance.get(`/Vehicle/cat`);

      setAllVehicleCategory(response?.data?.vehicleCategory);

      console.log("resposne of vehicle category",response);
      reset();
      toast.success("successs");
    } catch (error) {
      console.log("error from vehiclecat", error);
    //   toast.error(error?.me);
    }
  }, []);

  useEffect(() => {
    // FetchVehicleCategory();
    FetchAllVehicleCategory();
    FetchClientLevelOrgs();
  }, []);

  const allClientLevelOrganisations = clientLevelOrg?.map((item) => ({
    value: item.id,
    label: item.cl_org_name
    ,
  }));

  const vehicleCategorys = vehicleCategory?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

//   console.log("allClientLevelOrganisations", allClientLevelOrganisations);
  // console.log("AllCat", AllCategory);
//   console.log("clientLevelSuperUsers",clientLevelSuperUsers);
  

  const AddParkFee = useCallback(async (data: Inputs) => {
    console.log("data for adding park fee", data);
  
    try {
      const response = await axiosInstance.post(
        '/parkfee/create',
        data
      );
      console.log("response after creating park fee", response);
      
      toast.success(response?.data?.res?.message);
      fetchData()
      onClose()
    } catch (error) {
      console.log("error", error);
    //   toast.error(error);
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
          <h1 className=" font-bold  ">Add Park Fee</h1>
          <p className=" cursor-pointer" onClick={onClose}>
            x
          </p>
        </div>
        <form onSubmit={handleSubmit(AddParkFee)} className="  border-gray-200 ">
          <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
            <div className="mb-">
              <InputField
                label="park Fee Per Day"
                type="number"
                name="park_fee_per_day"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="mb-">
              <SelectComponent
                label="Selec Client Organisation"
                options={allClientLevelOrganisations}
                name="cl_org_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            <div className="mb-">
              <SelectComponent
                label="Selec Vehicle Category"
                options={vehicleCategorys}
                name="vehicle_category_id"
                register={register}
                errors={errors}
                required={true}
                defaultValue=""
              />
            </div>
            
           
            
          </div>

          <div className=" w-full text-center p-1 mt-3  space-x-2">
            
            <button
            type="button"
              onClick={() => onClose()}
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

export default AddParkFee;
