"use client";
import {
  InputField,
  SelectComponent,
  SelectInput,
} from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { states } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { Cities } from "@/utils/cities";
import { useRouter } from "next/navigation";
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

  const router = useRouter();
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

      // toast.success(response?.data?.message);
    } catch (error) {
      // toast.error(error?.response?.data?.message);
      console.log(error);
    }
  }, []);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axiosInstance.get(`/yard/${yardId?.yardId}`);
      console.log(response);

      const destructuredData = {
        ...response?.data?.res,
        user: response?.data?.res?.user?.name,
      };
      setYardData(destructuredData);
      setSelectState(destructuredData?.state);
      reset(destructuredData);

      // toast.success(response?.data?.message);
    } catch (error) {
      // toast.error(error?.response?.data?.message)
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
      const stateData = Cities.filter((state) => state.state === selectState);
      setFiltercitys(stateData?.map((value) => value?.city));
    }
  }, [selectState]);

  const editYard = useCallback(
    async (data: Inputs) => {
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
        router.push("/organisationManagement/yardManagement");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    },
    [yardId]
  );

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectState(selectedState);

    setValue("city", "");
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

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10">
      <div className="max-w-5xl w-full mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
        <div className="flex flex-col items-center">
          <div className="w-full  mb-">
            <h1 className="text-2xl font-bold text-black-700 pt-1  text-start">
              Edit Yard Organisation
            </h1>
            <div className="border-b mt-4"></div>
          </div>

          <form
            onSubmit={handleSubmit(editYard)}
            className="space-y-3 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full place-items-center justify-between"
          >
            <div className="mt-3">
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
                type="number"
                name="field_executive_contact"
                register={register}
                errors={errors}
                pattern=""
              />
            </div>
            <div className="">
              <SelectInput
                label="Select User"
                options={AllUsers}
                name="user_id"
                register={register}
                error={errors}
                required={false}
                defaultValue={""}
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
              options={filtercitys.map((city) => ({
                value: city,
                label: city,
              }))}
              register={register}
              errors={errors}
              required={true}
              defaultValue=""
            />

            <div className="flex justify-end col-span-full">
              <button
                type="button"
                onClick={() => close()}
                className="bg-red-500 text-white py-3 px-8 rounded-lg hover:bg-red-600 transition duration-200 mr-4"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-green-500 text-white py-3 px-8 rounded-lg hover:bg-green-600 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EdityardDataYard;

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
    <div className="flex flex-col">
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
