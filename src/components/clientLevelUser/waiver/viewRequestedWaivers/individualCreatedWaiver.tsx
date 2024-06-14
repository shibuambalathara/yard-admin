"use client";
import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { WaiverStatus } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { formStyle, inputStyle, labelStyle, loginInputStyle } from "../../../../components/ui/style";

const IndividualCreatedWaiver = ({ waiverId }) => {
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
      const response = await axiosInstance.get(`/waiver/${waiverId?.createdWaiverId}`);
      console.log(response);

      const destructuredData = { 
        ...response?.data?.res,
      };
      setWaiverData(destructuredData);

      reset(destructuredData);

      toast.success(response?.data?.message);
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
    
     
      const response = await axiosInstance.patch(`/waiver/${waiverId?.createdWaiverId}`, modifiedData);
      console.log('res,',response);
      
      
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex w-full text-gray-400 uppercase text-lg border-b mb-5 pb-1 justify-center">
        <h1 className="font-bold text-center">View Waiver</h1>
      </div>
      <form onSubmit={handleSubmit(editWaiver)} className="border-gray-200 mt-14">
        <div className="mx-auto grid grid-cols-3 gap-x-8 gap-y-10 justify-center items-center place-items-center p-2 w-fit border rounded-xl px-6 py-8">
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
        <div className="w-full text-center p-1 space-x-2 mt-6">
          <button
            type="button"
            // onClick={() => reset(waiverData)}
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
      {/* <div>
        <div>
          <InputField
            label="Waiver Code"
            type="text"
            name="waiver.code"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Vehicle Code"
            type="text"
            name="vehicle_ownership.vehicle.code"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Vehicle Make"
            type="text"
            name="vehicle_ownership.vehicle.make"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Vehicle Model"
            type="text"
            name="vehicle_ownership.vehicle.model"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Yard Code"
            type="text"
            name="vehicle_ownership.vehicle.yard.code"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Yard Name"
            type="text"
            name="vehicle_ownership.vehicle.yard.yard_name"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <div>
          <InputField
            label="Vehicle Category"
            type="text"
            name="vehicle_ownership.vehicle.vehicle_category.name"
            register={register}
            errors={errors}
            pattern=""
            disabled={true}
          />
        </div>
        <InputField
          label="Comment"
          type="text"
          name="comment"
          register={register}
          errors={errors}
          pattern=""
          disabled={true}
        />
      </div> */}
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
