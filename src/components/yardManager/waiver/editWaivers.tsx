"use client";
import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import { inputStyle, labelStyle } from "@/components/ui/style";
import axiosInstance from "@/utils/axios";
import { AccountStatus, WaiverStatus } from "@/utils/staticData";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";


const EditWaivers = ({ userId,onClose }) => {
  const [waiverData, setWaiverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
console.log('h',userId);
const router = useRouter();

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
      const response = await axiosInstance.get(`/waiver/${userId}`);
      console.log(response);

      const destructuredData = { 
        ...response?.data?.res,
      };
      setWaiverData(destructuredData);

      reset(destructuredData);

    
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  const  EditWaiver = useCallback(async (data: Inputs) => {
    const modifiedData = {
      reason: data?.reason?.toUpperCase(),
      status: data?.status?.toUpperCase(),
    };
    console.log('success');
    try {
    
     
      const response = await axiosInstance.patch(`/waiver/status/${userId}`, modifiedData);
      console.log('res,',response);
      
      
      toast.success(response?.data?.message);
      onClose()

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);


  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-4 rounded-lg w-full max-w-md">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-600"
      >
        
      </button>
      <div className="flex  w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
        <h1 className=" font-bold  ">Waiver Details</h1>
        <p className=" cursor-pointer" onClick={onClose}>
          x
        </p>
      </div>
      <form onSubmit={handleSubmit(EditWaiver)} className="  border-gray-200 ">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-5 justify-center place-items-center p-2 border ">
        <div>
            <SelectInput
              label="Status"
              name="status"
              defaultValue=""
              options={AccountStatus}
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
              label="Fee Per Day"
              type="text"
              name="fee_per_day"
              register={register}
              errors={errors}
              pattern=""
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

export default EditWaivers;

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


