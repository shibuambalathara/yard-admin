"use client";

import { InputField, SelectComponent, SelectInput } from "@/components/ui/fromFields";
import axiosInstance from "@/utils/axios";
import { states } from "@/utils/staticData";
import { useState, useEffect, useCallback } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  formStyle,
  inputStyle,
  labelStyle,
  loginInputStyle,
} from "../../../../components/ui/style";

const EdityardDataYard = ({ yardId }) => {
  const [yardData, setYardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Initially set to true to show loading spinner
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const [selectState, setSelectState] = useState("");
  const [filterDistricts, setFilterDistricts] = useState([]);
  const [Users, setUsers] = useState([]);
  const upperStates = states.map((value) => value.state.toUpperCase());

  type Inputs = {
    yard_name: string;
    id: string;
    field_executive_name: string;
    field_executive_contact: number;
    district: string;
    state: string;
    postal_code: number;
    land_mark: string;
    street_name: string;
    user: string;
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
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



  const fetchData = async () => {
    setIsLoading(true);
    const id = yardId?.yardId;

    try {
      const response = await axiosInstance.get(`/yard/${id}`);
      console.log('res',response)
      const destructuredData = { 
        ...response?.data?.res,
        user: response?.data?.res?.user?.name,
      };
      console.log('fetched',destructuredData);
      setYardData(destructuredData);
      setSelectState(destructuredData?.state.toUpperCase());
      reset(destructuredData);
      setSuccess({ text: response?.data?.message });
      toast.success('fetched')
    } catch (error) {
      setError({ text: error?.response?.data?.message });
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
      const stateData = states.find(
        (state) => state.state.toUpperCase() === selectState
      );
      setFilterDistricts(stateData?.districts.map((value) => value.toUpperCase()));
    }
  }, [selectState]);

  const editYard = useCallback(async (data: Inputs) => {
    const modifiedData = {
      ...data,
      yard_name: data?.yard_name?.toUpperCase(),
      field_executive_name: data?.field_executive_name?.toUpperCase(),
      district: data?.district.toUpperCase(),
    };
    console.log('data',modifiedData);
    

    try {
      const id = yardId?.yardId;
      await axiosInstance.put(`/yard/${id}`, modifiedData);
      
      toast.success('Yard is updated')
    } catch (error) {
      console.log("error", error);
      toast.error(`something went wrong`);
    }
  }, [yardId]);

  const handleStateChange = (e) => {
    const selectedState = e.target.value.toUpperCase();
    setSelectState(selectedState);
  };


  const AllUsers = Users?.map((item) => ({
    // value: item.id,
    label: item.name,
  }));

  let result = AllUsers.filter((item) => item?.label == yardData?.user);
  if (result.length === 0) {
    // The yardData.user_id is not present in AllUsers, so we push a new item
    AllUsers.push({ label: yardData?.user});
    // console.log("Updated AllUsers", AllUsers);
  } else {
    // If AllUsers is empty, we can directly push the new item
    AllUsers.push({  label: yardData?.user });
      console.log("Updated AllUsers", AllUsers);
  }


console.log('user',AllUsers)
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg w-full">
      <div className="flex w-full text-gray-400 uppercase text-lg border-b mb-5 pb-1 justify-center">
        <h1 className="font-bold text-center">Edit Yard</h1>
      </div>
      <form onSubmit={handleSubmit(editYard)} className="border-gray-200 mt-4">
        <div className="mx-auto grid grid-cols-2 gap-x-8 gap-y-10 justify-center items-center place-items-center p-2 w-fit">
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
          <SelectInput
              label="Select User"
              options={AllUsers}
              name="user"
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
          <div className="flex flex-col">
            <label htmlFor="state" className={labelStyle.data}>
              State
            </label>
            <select
              {...register("state", { required: true })}
              className={inputStyle.data}
              onChange={handleStateChange}
              value={selectState}
            >
              {upperStates.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.state && (
              <p className="text-red-500">State is required</p>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="district" className={labelStyle.data}>
              District
            </label>
            <select
              {...register("district", { required: true })}
              className={inputStyle.data}
            >
              {filterDistricts?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.district && (
              <p className="text-red-500">District is required</p>
            )}
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
