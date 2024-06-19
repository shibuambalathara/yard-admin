"use client"
import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { states } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { Cities } from "@/utils/cities";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";
import { log } from "console";
type Inputs = {
  yard_name: string;
  id: string;
  field_executive_name: string;
  field_executive_contact: number;
  city: string;
  state: string;
  postal_code: number;
  land_mark: string;
  street_name: string;
  user: string;
};

const EdityardDataYard = ({ yardId }) => {
  const [yardData, setYardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectState, setSelectState] = useState("");
  const [filtercitys, setFiltercitys] = useState([]);
  const [Users, setUsers] = useState([]);
  const [uniqueStates, setUniqueStates] = useState([]);

 
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    // Extract unique state names from Cities array
    const uniqueStates = Cities.reduce((acc, current) => {
      if (!acc.includes(current.state)) {
        acc.push(current.state);
      }
      return acc;
    }, []);

    setUniqueStates(uniqueStates);
  }, []); // Only run once on component mount
  const FetchUsers = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        `/user/users/assignment?role=YARD_MANAGER`
      );
      setUsers(response?.data?.data);
      
      

      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(error)
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
     

    try {
      const response = await axiosInstance.get(`/yard/${ yardId?.yardId}`);
      console.log(response);
      
      const destructuredData = { 
        ...response?.data?.res,
        user: response?.data?.res?.user?.name,
      };
      setYardData(destructuredData);
      setSelectState(destructuredData?.state);
      reset(destructuredData);
      
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message)
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    FetchUsers();
  }, [yardId]);

  useEffect(() => {
    if (selectState) {
      const stateData = Cities.filter(
        (state) => state.state === selectState
      );
      setFiltercitys(stateData?.map((value) => value?.city));
    }
  }, [selectState]);

  const editYard = useCallback(async (data: Inputs) => {
    const modifiedData = {
      ...data,
      yard_name: data?.yard_name.toUpperCase(),
      field_executive_name: data?.field_executive_name?.toUpperCase(),
      city: data?.city,
    };

    try {
      const id = yardId?.yardId;
      const response = await axiosInstance.put(`/yard/${id}`, modifiedData);
      toast.success(response?.data?.message);
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, [yardId]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);
      
    setValue("city", '')
  };

  const AllUsers = Users?.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  let result = AllUsers.filter((item) => item?.label == yardData?.user);
  if (result.length === 0) {
    AllUsers.push({ value: yardData?.user_id, label: yardData?.user });
  } else {
    AllUsers.push({ value: yardData?.user_id, label: yardData?.user });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex w-full text-gray-400 uppercase text-lg border-b mb-5 pb-1 justify-center">
        <h1 className="font-bold text-center">Edit Yard</h1>
      </div>
      <form onSubmit={handleSubmit(editYard)} className="border-gray-200 mt-14">
        <div className="mx-auto grid grid-cols-3 gap-x-8 gap-y-10 justify-center items-center place-items-center p-2 w-fit border rounded-xl px-6 py-8">
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
          <div className="mt-2">
            <SelectInput
              label="Select User"
              options={AllUsers}
              name="user_id"
              register={register}
              error={errors}
              required={false}
              defaultValue={''}
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
              type="number"
              name="field_executive_contact"
              register={register}
              errors={errors}
              pattern=""
            />
          </div>
          <SelectChange
            label="State"
            name="state"
            options={uniqueStates}
            register={register}
            errors={errors}
            required={true}
            defaultValue=""
            handleChange={handleStateChange}
          />
          <SelectChange
            label="city"
            name="city"
            options={filtercitys.map(city => ({ value: city, label: city }))}
            register={register}
            errors={errors}
            required={true}
            defaultValue=""
            
          />
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
        <div className="w-full text-center p-1 space-x-2 mt-6">
          <button
            type="button"
            onClick={() => reset(yardData)}
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
  );
};

export default EdityardDataYard;

export const SelectChange = (props) => {
  const{
    label,
    name,
    options,
    register,
    errors,
    required = true,
    defaultValue,

  }=props
  
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
