"use client";
import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { WaiverStatus } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formStyle, inputStyle, labelStyle, loginInputStyle } from "../../../../components/ui/style";
import Spinner from "@/components/commonComponents/spinner/spinner";

const IndividualSuperWaiver = ({ waiverId ,onClose,fetchAllWaivers}) => {
console.log("waiverId", waiverId);


  const [waiverData, setWaiverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  type Inputs = {
    comment: string;
    id: string;
    reason: string;
    fee_per_day: number;
    status: string;
    waiver: { code: string };
    vehicle_ownership: {
      vehicle: {
        code: string;
        make: string;
        model: string;
        yard: { yard_name: string, code: string };
        vehicle_category: { name: string };
      };
    };
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`/waiver/${waiverId}`);
      console.log(response);

      const destructuredData = { 
        ...response?.data?.res,
      };
      setWaiverData(destructuredData);

      reset(destructuredData);

     
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [waiverId]);

  const editWaiver = useCallback(async (data: Inputs) => {
    const modifiedData = {
      fee_per_day: data?.fee_per_day,
      reason: data?.reason?.toUpperCase(),
      status: data?.status?.toUpperCase(),
    };
    console.log('success');
    try {
    
     
      const response = await axiosInstance.patch(`/waiver/${waiverId}`, modifiedData);
      console.log('res,',response);
      
      
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  if (isLoading) {
    return <div><Spinner/></div>;
  }

  return (
    <div className="flex items-center justify-center relative z-50 ">
    <div className="bg-white rounded-lg shadow-2xl p-5 max-w-5xl w-full space-y-3 ">
      <div className="">
      <h1 className="p-2 uppercase text-start font-semibold text-base text-slate-400">Update Waiver</h1>
      <div className="border-b "></div>
      </div>
     
      <form className="space-y-2  " onSubmit={handleSubmit(editWaiver)}>
        
     <div className="grid  grid-cols-1 md:grid-cols-1 gap-2 border p-4 place-items-center h-auto overflow-y-scroll scrollbar-hide ">
           
     <div>
            <SelectInput
              label="status"
              name="status"
              defaultValue=""
              options={WaiverStatus}
              register={register}
              error={errors}
              data=""
              required={false}
            />
          </div>
          <div>
            <InputField
              label="Reason"
              type="text"
              name="reason"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <div>
            <InputField
              label="Fee per Day"
              type="number"
              name="fee_per_day"
              register={register}
              errors={errors}
              pattern=""
            />
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

export default IndividualSuperWaiver;

export const SelectChange = (props) => {
  const {
    label,
    name,
    options,
    register,
    errors,
    required = true,
    defaultValue,
  } = props;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={labelStyle?.data}>
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        className={inputStyle.data}
        defaultValue={defaultValue}
        onChange={props?.handleChange} // Only add onChange if handleChange is provided
      >
        <option value="" disabled hidden>
          {`Select ${label}`}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {errors[name] && <p className="text-red-500">{`${label} is required`}</p>}
    </div>
  );
};
