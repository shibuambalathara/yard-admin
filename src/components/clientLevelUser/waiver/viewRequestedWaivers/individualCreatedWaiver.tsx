"use client";

import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { WaiverStatus } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formStyle, inputStyle, labelStyle, loginInputStyle } from "../../../../components/ui/style";
import { useRouter } from "next/navigation";
import Loading from "@/app/(home)/(superAdmin)/loading";

const IndividualCreatedWaiver = ({ waiverId, onClose ,fetch}) => {
  const [waiverData, setWaiverData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  console.log(waiverData);

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
      setWaiverData(destructuredData?.status);

      reset(destructuredData);
    } catch (error) {
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
      console.log('res,', response);

      toast.success(response?.data?.message);
      fetch()
      onClose();

    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  if (isLoading) {
    return <div><Loading /></div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg w-fit">
      <div className="flex w-full justify-between text-gray-400 uppercase text-lg border-b mb-5 pb-1">
        <h1 className="font-bold">View Waiver</h1>
      </div>
      <form onSubmit={handleSubmit(editWaiver)} className="border-gray-200 mt-4">
        <div className="mx-auto grid grid-cols-1 gap-x-8 gap-y-2 justify-center items-center place-items-center p-2 w-fit border rounded-xl px-6 py-8">
          <div>
            <SelectInput
              disabled={waiverData !== 'PENDING'}
              label="Status"
              name="status"
              defaultValue=""
              options={
                waiverData === 'PENDING' 
                  ? WaiverStatus 
                  : [{ label: waiverData, value: waiverData }]
              }
              register={register}
              error={errors}
              data=""
              required={false}
            />
          </div>
          <div>
            <InputField
              disabled={true}
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
              disabled={true}
              label="Fee per Day"
              type="number"
              name="fee_per_day"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
        </div>
        {waiverData === 'PENDING' && (
          <div className="w-full text-center p-1 space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
               className="bg-green-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-green-600 transition duration-200"
            >
              Submit
            </button>
          </div>
        )}
        {waiverData !== 'PENDING' && (
          <div className="w-full text-center p-1 space-x-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white py-2 lg:px-8 px-3 lg:w-32 rounded hover:bg-red-600 transition duration-200"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default IndividualCreatedWaiver;

export const SelectChange = (props) => {
  const {
    label,
    name,
    options,
    register,
    errors,
    required = true,
    defaultValue,
    handleChange,
  } = props;

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className={labelStyle.data}>
        {label}
      </label>
      <select
        id={name}
        {...register(name, { required })}
        className={inputStyle.data}
        defaultValue={defaultValue}
        onChange={handleChange} // Only add onChange if handleChange is provided
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
