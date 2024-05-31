"use client"

import { InputField, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";

const EditIndividualYard = ({ yardId }) => {
  const [yardData, setYardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  type Inputs = {
    yard_name: string;
    id: string;
    field_executive_name: string;
    field_executive_contact: number;
    country: string;
    district: string;
    postal_code: number;
    land_mark: string;
    street_name: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchData = async () => {
    setIsLoading(true);
    const id = yardId?.yardId;
  
    try {
      const response = await axiosInstance.get(`/yard/${id}`);
      
      const destructuredData = { ...response?.data?.yard };
      setYardData(destructuredData);

      // Set form values
      Object.keys(destructuredData).forEach(key => {
        setValue(key, destructuredData[key]);
      });

      setSuccess({ text: response?.data?.message });
    } catch (error) {
      setError({ text: error?.response?.data?.message });
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    } 
  };

  useEffect(() => {
    fetchData();
  }, [yardId]);


  const editYard = useCallback(async (data: Inputs) => {
    console.log("create from cientSuperorg", data);
    const modifiedData = {
      ...data,
      yard_name: data?.yard_name?.toUpperCase(),
      field_executive_name: data?.field_executive_name?.toUpperCase(),
      district : data?.district.toUpperCase(),
    };

    // console.log("client level org modifiedData",modifiedData);
    
    try {
      const id = yardId?.yardId;
      const response = await axiosInstance.put(
        `/yard/${id}`,
        modifiedData
      );
      console.log("response after clientOrgCreaet", response);
      console.log("yard created");
      
    } catch (error) {
      console.log("error", error);
      // toast.error(error);
    }
  },[])




  



  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg w-full ">
      <div className="flex w-full  text-gray-400 uppercase text-lg border-b mb-5 pb-1 justify-center">
        <h1 className="font-bold text-center">Edit Yard</h1>
        
      </div>
      <form onSubmit={handleSubmit(editYard)}  className="border-gray-200 mt-4">
        <div className=" mx-auto grid grid-cols-2 gap-x-8 gap-y-10 justify-center place-items-center p-2  w-fit">
          <div>
            <InputField
              label="Yard Name"
              type="text"
              name="yard_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Field Executive Name"
              type="text"
              name="field_executive_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Field Executive Contact"
              type="text"
              name="field_executive_contact"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Country"
              type="text"
              name="country"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="District"
              type="text"
              name="district"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Postal Code"
              type="text"
              name="postal_code"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Land Mark"
              type="text"
              name="land_mark"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Street Name"
              type="text"
              name="street_name"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
        </div>
        
        <div className=" w-full text-center p-1   space-x-2 mt-6">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-10 w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
            <button
              className="bg-red-500 text-white py-2 px-10 w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
      </form>
    </div>
  );
}

export default EditIndividualYard;
